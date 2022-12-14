const authModel = require('../models/user.js');
// const apiResponse = require('../utils/apiResponse.js');

exports.signup = async (req, res) => {
    const { userType, address, name, email, password } = req.body.user; // kashuken
    const { role } = req.params;

    // if ((!id || !userType || !address || !name || !email || !password)) {
    //     console.log('1');
    //     return apiResponse.badRequest(res);
    // }

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await authModel.signup(true, false, { userType, address, name, email, password });
    } else if (role === 'consumer') {
        modelRes = await authModel.signup(false, true, { userType, address, name, email, password });
    } 
    res.send(modelRes);
};

exports.signin = async (req, res) => {
    const { username, password, userType } = req.body; // kashuken
    const { role } = req.params;
    // if (!id || !password || !role) {
    //     return apiResponse.badRequest(res);
    // }
    
    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await authModel.signin(true, false, { username, password, userType });
    } else if (role === 'consumer') {
        modelRes = await authModel.signin(false, true, { username, password, userType });
    }

    res.send(modelRes);
};

exports.getAllUser = async (req, res) => {
    const { role } = req.params;

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await authModel.getAllUser(true, false);
    } else if (role === 'consumer') {
        modelRes = await authModel.getAllUser(false, true);
    } 
    res.send(modelRes);
};