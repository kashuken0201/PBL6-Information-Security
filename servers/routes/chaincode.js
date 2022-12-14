const chaincodeRouter = require('express').Router();
const controller = require('../controllers/chaincode.js');

chaincodeRouter.get('/:role/info/:info', controller.getChainInfo);
chaincodeRouter.get('/:role/block-number/:number', controller.getBlockByNumber);
chaincodeRouter.get('/:role/block-hash/:hash', controller.getBlockByHash);
chaincodeRouter.get('/:role/transact/:id', controller.getTransactionByID);
chaincodeRouter.get('/:role/block-id/:txId', controller.getBlockByTxID);

module.exports = chaincodeRouter;
