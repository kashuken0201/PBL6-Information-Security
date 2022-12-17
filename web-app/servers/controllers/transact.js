const transactModel = require('../models/transact.js');
// const apiResponse = require('../utils/apiResponse.js');

exports.transactProductOrder = async (req, res) => {
    const { productId } = req.params;
    const { id, role } = req.body;

    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }

    let modelRes;
    if (role == 'consumer') {
        modelRes = await transactModel.orderProduct({ productId, id });
    }
    res.send(modelRes);
};

exports.transactProductSell = async (req, res) => {
    const { productId } = req.params;
    const { id, role } = req.body;

    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }

    let modelRes;
    if (role == 'manufacturer') {
        modelRes = await transactModel.sellProduct({ productId, id });
    }
    res.send(modelRes);
};

exports.transactProductDeliver = async (req, res) => {
    const { productId } = req.params;
    const { id, role } = req.body;

    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }

    let modelRes;
    if (role == 'consumer') {
        modelRes = await transactModel.deliverProduct({ productId, id });
    }
    res.send(modelRes);
};

exports.getAllTransact = async (req, res) => {
    const { id, role } = req.params;

    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }

    let modelRes;
    if (role == 'consumer') {
        modelRes = await transactModel.getAllTransact(false, true, { id });
    } else if (role == 'manufacturer') {
        modelRes = await transactModel.getAllTransact(true, false, { id });
    }
    res.send(modelRes);
};