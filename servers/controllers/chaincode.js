const chaincodeModel = require('../models/chaincode');

exports.getChainInfo = async (req, res) => {
    const { info, role } = req.params
    // console.log('1');
    
    // if (!productId || !id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await chaincodeModel.getChainInfo(true, false, info);
    } else if (role === 'consumer') {
        modelRes = await chaincodeModel.getChainInfo(false, true, info);
    }

    res.send(modelRes);
};

exports.getBlockByNumber = async (req, res) => {
    const { number, role } = req.params
    // console.log('1');

    // if (!productId || !id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await chaincodeModel.getBlockByNumber(true, false, number);
    } else if (role === 'consumer') {
        modelRes = await chaincodeModel.getBlockByNumber(false, true, number);
    }

    res.send(modelRes);
};

exports.getBlockByHash = async (req, res) => {
    const { hash, role } = req.params
    // console.log('1');

    // if (!productId || !id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await chaincodeModel.getBlockByHash(true, false, hash);
    } else if (role === 'consumer') {
        modelRes = await chaincodeModel.getBlockByHash(false, true, hash);
    }

    res.send(modelRes);
};

exports.getTransactionByID = async (req, res) => {
    const { id, role } = req.params
    // console.log('1');

    // if (!productId || !id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await chaincodeModel.getTransactionByID(true, false, id);
    } else if (role === 'consumer') {
        modelRes = await chaincodeModel.getTransactionByID(false, true, id);
    }

    res.send(modelRes);
};

exports.getBlockByTxID = async (req, res) => {
    const { txId, role } = req.params
    // console.log('1');

    // if (!productId || !id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await chaincodeModel.getBlockByTxID(true, false, txId);
    } else if (role === 'consumer') {
        modelRes = await chaincodeModel.getBlockByTxID(false, true, txId);
    }

    res.send(modelRes);
};
