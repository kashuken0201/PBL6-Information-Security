const productModel = require('../models/product');
// const apiResponse = require('../utils/apiResponse');

exports.createProduct = async (req, res) => {
    const { id, name, price, manuName, desc } = req.body.product;
    // console.log('1');

    // if (!name || !id || !price || !loggedUserType) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');

    // if (loggedUserType !== 'manufacturer') {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('3');

    const modelRes = await productModel.createProduct({ name, id, price, manuName, desc });
    res.send(modelRes);
};

exports.updateProduct = async (req, res) => {
    const { id, name, price, desc } = req.body.product;
    const { productId } = req.params

    // if (!productId || !name || !id || !price || !loggedUserType || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');

    // if (loggedUserType === 'consumer') {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('3');

    const modelRes = await productModel.updateProduct({ productId, id, name, price, desc});

    res.send(modelRes);
};

exports.getProductbyId = async (req, res) => {
    const { id, productId, role } = req.params

    // console.log('1');

    // if (!productId || !id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await productModel.getProductById(true, false, { productId, id });
    } else if (role === 'consumer') {
        modelRes = await productModel.getProductById(false, true, { productId, id });
    }
    res.send(modelRes);
};

exports.getAllProducts = async (req, res) => {
    const { id, role } = req.params

    // console.log('1');

    // if (!id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await productModel.getAllProducts(true, false, { id });
    } else if (role === 'consumer') {
        modelRes = await productModel.getAllProducts(false, true, { id });
    }
    res.send(modelRes);
};

exports.getLog = async (req, res) => {
    const { id, productId, role } = req.params

    // console.log('1');

    // if (!id || !role) {
    //     return apiResponse.badRequest(res);
    // }
    // console.log('2');
    // console.log('3');
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await productModel.getLog(true, false, { productId, id });
    } else if (role === 'consumer') {
        modelRes = await productModel.getLog(false, true, { productId, id });
    }
    res.send(modelRes);
};

