const network = require('../fabric/network.js');
// const apiResponse = require('../utils/apiResponse.js');
const channel = 'milkchannel'

exports.getChainInfo = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincode(networkObj, 'GetChainInfo', info);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: contractRes,
        key: 'getChainInfo',
    };
};

exports.getBlocks = async (isManufacturer, isConsumer) => {
    let result = [];
    let number = 0;
    while (true) {
        try {
            const tmp_networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
            const tmp_contractRes = await network.queryChaincode(tmp_networkObj, 'GetBlockByNumber', channel, number);
            const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
            const contractRes = await network.queryChaincode(networkObj, 'GetBlockByNumber', channel, number);
            const res = {
                Number: contractRes.header.number,
                PreviousHash: contractRes.header.previous_hash,
                DataHash: contractRes.header.data_hash,
                TxID: contractRes.data.data[0].payload.header.channel_header.tx_id,
                Timestamp: contractRes.data.data[0].payload.header.channel_header.timestamp,
                Creator: contractRes.data.data[0].payload.header.signature_header.creator.mspid,
                Value: contractRes.data.data[0].payload.data
            }
            result.push(res)
            number++
        } catch (error) {
            return {
                data: result,
                key: 'getBlockByNumber',
            };
        }
    }
    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
};

exports.getBlockByHash = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincode(networkObj, 'GetBlockByHash', channel, info);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: contractRes,
        key: 'getBlockByHash',
    };
};

exports.getTransactionByID = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincode(networkObj, 'GetTransactionByID', channel, info);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: contractRes,
        key: 'getTransactionByID',
    };
};

exports.getBlockByTxID = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincodee(networkObj, 'GetBlockByTxID', channel, info);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: contractRes,
        key: 'getBlockByTxID',
    };
};