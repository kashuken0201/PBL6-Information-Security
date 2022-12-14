const network = require('../fabric/network.js');
const apiResponse = require('../utils/apiResponse.js');

exports.orderProduct = async information => {
    const { productId, id } = information;

    const networkObj = await network.connect(false, true, id);
    const contractRes = await network.invoke(networkObj, 'orderProduct', id, productId);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }
    return {
        data: contractRes,
        key: 'orderProduct',
    };
};

exports.sellProduct = async information => {
    const { productId, id } = information;

    const networkObj = await network.connect(true, false, id);
    const contractRes = await network.invoke(networkObj, 'sellToConsumer', productId);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }
    return {
        data: contractRes,
        key: 'sellProduct',
    };
};

exports.deliverProduct = async information => {
    const { productId, id } = information;

    const networkObj = await network.connect(false, true, id);
    const contractRes = await network.invoke(networkObj, 'deliveredProduct', productId);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }
    return {
        data: contractRes,
        key: 'deliverProduct',
    };
};

exports.getAllTransact = async (isManufacturer, isConsumer, information) => {
    const { id } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, id);
    const contractRes = await network.query(networkObj, 'queryAll', 'Product');

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    const res = [];
    contractRes.forEach(element => {
        console.log(element.Record.OrderID)
        if (element.Record.OrderID !== "")
            res.push(element.Record)
    });
    return {
        data: contractRes,
        key: 'getAllTransact',
    };
};