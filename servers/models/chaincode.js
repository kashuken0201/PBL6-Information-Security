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

exports.getBlockByNumber = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincode(networkObj, 'GetBlockByNumber', channel, info);
    contractRes = await network.queryChaincode(networkObj, 'GetBlockByNumber', channel, info);

    const res = {
        Number: contractRes.header.Number,
        PreviousHash: contractRes.header.previous_hash,
        DataHash: contractRes.header.data_hash,
        Value: contractRes.data.data
    }
    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: res,
        key: 'getBlockByNumber',
    };
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