#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE=${1:-"go"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`
if [ "$CC_SRC_LANGUAGE" = "go" -o "$CC_SRC_LANGUAGE" = "golang"  ]; then
	CC_RUNTIME_LANGUAGE=golang
	CC_SRC_PATH=github.com/chaincode/supply/go
elif [ "$CC_SRC_LANGUAGE" = "java" ]; then
	CC_RUNTIME_LANGUAGE=java
	CC_SRC_PATH=/opt/gopath/src/github.com/chaincode/supply/java
elif [ "$CC_SRC_LANGUAGE" = "javascript" ]; then
	CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
	CC_SRC_PATH=/opt/gopath/src/github.com/chaincode/supply/javascript
elif [ "$CC_SRC_LANGUAGE" = "typescript" ]; then
	CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
	CC_SRC_PATH=/opt/gopath/src/github.com/chaincode/supply/typescript
	echo Compiling TypeScript code into JavaScript ...
	pushd ../chaincode/supply/typescript
	npm install
	npm run build
	popd
	echo Finished compiling TypeScript code into JavaScript
else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, javascript, and typescript
	exit 1
fi


# clean the keystore
rm -rf ./hfc-key-store

# launch network; create channel and join peer to channel
cd ../first-network
echo y | ./byfn.sh down
echo y | ./byfn.sh up -a -n -s couchdb

CONFIG_ROOT=/opt/gopath/src/github.com/hyperledger/fabric/peer
MANUFACTURER_MSPCONFIGPATH=${CONFIG_ROOT}/crypto/peerOrganizations/manufacturer.milkain.com/users/Admin@manufacturer.milkain.com/msp
MANUFACTURER_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/peerOrganizations/manufacturer.milkain.com/peers/peer0.manufacturer.milkain.com/tls/ca.crt
CONSUMER_MSPCONFIGPATH=${CONFIG_ROOT}/crypto/peerOrganizations/consumer.milkain.com/users/Admin@consumer.milkain.com/msp
CONSUMER_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/peerOrganizations/consumer.milkain.com/peers/peer0.consumer.milkain.com/tls/ca.crt
ORDERER_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/ordererOrganizations/milkain.com/orderers/orderer.milkain.com/msp/tlscacerts/tlsca.milkain.com-cert.pem
set -x

echo "Installing smart contract on peer0.manufacturer.milkain.com"
docker exec \
  -e CORE_PEER_LOCALMSPID=ManufacturerMSP \
  -e CORE_PEER_ADDRESS=peer0.manufacturer.milkain.com:7051 \
  -e CORE_PEER_MSPCONFIGPATH=${MANUFACTURER_MSPCONFIGPATH} \
  -e CORE_PEER_TLS_ROOTCERT_FILE=${MANUFACTURER_TLS_ROOTCERT_FILE} \
  cli \
  peer chaincode install \
    -n supply \
    -v 1.0 \
    -p "$CC_SRC_PATH" \
    -l "$CC_RUNTIME_LANGUAGE"

echo "Installing smart contract on peer0.consumer.milkain.com"
docker exec \
  -e CORE_PEER_LOCALMSPID=ConsumerMSP \
  -e CORE_PEER_ADDRESS=peer0.consumer.milkain.com:9051 \
  -e CORE_PEER_MSPCONFIGPATH=${CONSUMER_MSPCONFIGPATH} \
  -e CORE_PEER_TLS_ROOTCERT_FILE=${CONSUMER_TLS_ROOTCERT_FILE} \
  cli \
  peer chaincode install \
    -n supply \
    -v 1.0 \
    -p "$CC_SRC_PATH" \
    -l "$CC_RUNTIME_LANGUAGE"

echo "Instantiating smart contract on milkchannel"
docker exec \
  -e CORE_PEER_LOCALMSPID=ManufacturerMSP \
  -e CORE_PEER_MSPCONFIGPATH=${MANUFACTURER_MSPCONFIGPATH} \
  cli \
  peer chaincode instantiate \
    -o orderer.milkain.com:7050 \
    -C milkchannel \
    -n supply \
    -l "$CC_RUNTIME_LANGUAGE" \
    -v 1.0 \
    -c '{"Args":[]}' \
    -P "AND('ManufacturerMSP.member','ConsumerMSP.member')" \
    --tls \
    --cafile ${ORDERER_TLS_ROOTCERT_FILE} \
    --peerAddresses peer0.manufacturer.milkain.com:7051 \
    --tlsRootCertFiles ${MANUFACTURER_TLS_ROOTCERT_FILE}

echo "Waiting for instantiation request to be committed ..."
sleep 10

echo "Submitting initLedger transaction to smart contract on milkchannel"
echo "The transaction is sent to the two peers with the chaincode installed (peer0.manufacturer.milkain.com and peer.consumer.milkain.com) so that chaincode is built before receiving the following requests"
docker exec \
  -e CORE_PEER_LOCALMSPID=ManufacturerMSP \
  -e CORE_PEER_MSPCONFIGPATH=${MANUFACTURER_MSPCONFIGPATH} \
  cli \
  peer chaincode invoke \
    -o orderer.milkain.com:7050 \
    -C milkchannel \
    -n supply \
    -c '{"function":"initLedger","Args":[]}' \
    --waitForEvent \
    --tls \
    --cafile ${ORDERER_TLS_ROOTCERT_FILE} \
    --peerAddresses peer0.manufacturer.milkain.com:7051 \
    --peerAddresses peer0.consumer.milkain.com:9051 \
    --tlsRootCertFiles ${MANUFACTURER_TLS_ROOTCERT_FILE} \
    --tlsRootCertFiles ${CONSUMER_TLS_ROOTCERT_FILE}
set +x
cd ../web-app/servers
rm -rf identity
cat <<EOF
Total setup execution time : $(($(date +%s) - starttime)) secs ...
EOF