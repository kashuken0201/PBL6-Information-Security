const transactModel = require('../models/transact.js');
// const apiResponse = require('../utils/apiResponse.js');

exports.transactProductOrder = async (req, res) => {
    // find who initiates this event by decoding the token and getting the user type
    const { productId } = req.params;
    const { id, role } = req.body;

    // console.log('1');
    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    let modelRes;
    if (role == 'consumer') {
        // call send to Wholesaler
        modelRes = await transactModel.orderProduct({ productId, id });
    }

    res.send(modelRes);
};

exports.transactProductSell = async (req, res) => {
    // find who initiates this event by decoding the token and getting the user type
    const { productId } = req.params;
    const { id, role } = req.body;

    // console.log('1');
    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    let modelRes;
    if (role == 'manufacturer') {
        // call send to Wholesaler
        modelRes = await transactModel.sellProduct({ productId, id });
    }

    res.send(modelRes);
};

exports.transactProductDeliver = async (req, res) => {
    // find who initiates this event by decoding the token and getting the user type
    const { productId } = req.params;
    const { id, role } = req.body;

    // console.log('1');
    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    let modelRes;
    if (role == 'consumer') {
        // call send to Wholesaler
        modelRes = await transactModel.deliverProduct({ productId, id });
    }
    
    res.send(modelRes);
};

exports.getAllTransact = async (req, res) => {
    // find who initiates this event by decoding the token and getting the user type
    const { id, role } = req.params;

    // console.log('1');
    // if (!userId || !loggedUserType || !productId || !id) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    let modelRes;
    if (role == 'consumer') {
        modelRes = await transactModel.getAllTransact(false, true, { id });
    } else if (role == 'manufacturer') {
        modelRes = await transactModel.getAllTransact(true, false, { id });
    }
    
    res.send(modelRes);
};