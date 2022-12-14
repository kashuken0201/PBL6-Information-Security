const network = require('../fabric/network.js');
// const apiResponse = require('../utils/apiResponse.js');
// const authenticateUtil = require('../utils/authenticate.js');


exports.signup = async (isManufacturer, isConsumer, information) => {
    const { userType, address, name, email, password } = information;

    let networkObj;
    networkObj = await network.connect(isManufacturer, isConsumer, 'admin');

    let contractRes;
    contractRes = await network.invoke(networkObj, 'createUser', name, email, userType, address, password);
    console.log('5');
    const walletRes = await network.registerUser(isManufacturer, isConsumer, contractRes.UserID);

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
// User1 kashuken 123456
exports.signin = async (isManufacturer, isConsumer, information) => {
    const { username, password, userType } = information;
    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin');
    let contractRes;
    if (username === 'admin') {
        contractRes = await network.query(networkObj, 'signIn', username, username, password); // admin adminpw
        contractRes.UserType = isManufacturer ? 'manufacturer' : 'consumer'
        return {
            data: contractRes,
            key: 'signin',
        };
    } else {
        console.log(userType)
        contractRes = await network.query(networkObj, 'signIn', 'User', username, password); // admin adminpw
        contractRes.forEach(element => {
            if (element.Record.Name === username && element.Record.Password === password && element.Record.UserType === userType) {
                contractRes = element.Record
            }
        });
        console.log(contractRes);
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
    // console.log(contractRes);
    // const { Name, UserType } = contractRes;
    // const accessToken = authenticateUtil.generateAccessToken({ id, UserType, Name });
    // return apiResponse.createModelRes(200, 'Success', { id, UserType, Name, accessToken });


};

exports.getAllUser = async (isManufacturer, isConsumer) => {

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin');

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