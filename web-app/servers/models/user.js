const network = require('../fabric/network.js');
// const apiResponse = require('../utils/apiResponse.js');
// const authenticateUtil = require('../utils/authenticate.js');

exports.signup = async (isManufacturer, isConsumer, information) => {
    const { userType, address, name, email, password } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'supply');
    const contractRes = await network.invoke(networkObj, 'createUser', name, email, userType, address, password);
    await network.registerUser(isManufacturer, isConsumer, contractRes.UserID);

    // const error = walletRes.error || networkObj.error || contractRes.error;
    // if (error) {
    //     const status = walletRes.status || networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);

    return {
        data: contractRes,
        key: 'signup',
    };
};

exports.signin = async (isManufacturer, isConsumer, information) => {
    const { username, password, userType } = information;
    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'supply');

    let contractRes;
    if (username === 'admin') {
        contractRes = await network.query(networkObj, 'signIn', username, username, password);
        contractRes.UserType = isManufacturer ? 'manufacturer' : 'consumer'
        return {
            data: contractRes,
            key: 'signin',
        };
    } else {
        contractRes = await network.query(networkObj, 'signIn', 'User', username, password);
        contractRes.forEach(element => {
            if (element.Record.Name === username && element.Record.Password === password && element.Record.UserType === userType) {
                contractRes = element.Record
            }
        });
        if (contractRes !== null)
            return {
                data: contractRes,
                key: 'signin',
            };
        return {
            data: 'Not exist, failed to login',
            key: 'signin',
        };
    }

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }
    // const accessToken = authenticateUtil.generateAccessToken({ id, UserType, Name });
    // return apiResponse.createModelRes(200, 'Success', { id, UserType, Name, accessToken });
};

exports.getAllUser = async (isManufacturer, isConsumer) => {
    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'supply');
    const contractRes = await network.query(networkObj, 'queryAll', 'User');

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    const res = [];
    contractRes.forEach(element => {
        res.push(element.Record)
    });
    return {
        data: res,
        key: 'getAllUser',
    };
};