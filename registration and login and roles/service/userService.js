'use strict';

var db = require('../connection/connection')
var loginModel = require('../models/loginModel')();
var cryptography = require('../helper/cryptography');
var cacheService = require('../helper/cache')();
var authService = require('../helper/auth')();


//This API checks whether user exists in database or not and return its data
module.exports.userLoginPOST = function (req, res, next) {
    var validator = require("email-validator");

    res.setHeader('Content-Type', 'application/json');
    var _params = req.swagger.params;
    
    var user = {};

    if (_params.username.value) {
        // if (validator.validate(_params.email.value))
            user.email = _params.email.value.toLowerCase();
    }

    if (_params.password.value)
        user.password = cryptography.sha256(_params.password.value);

    if (_params.username.value && _params.password.value) {
        userDal.userLoginPOST(user, function (err, userDetails) {
            if (err) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
            }
            else {
                //Here we have successful login. Now store the token in cache.
                var token = authService.issueToken(userDetails.userId, userDetails.userType);
                res.setHeader("authToken", token);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, data: userDetails, message: 'User logged in successfully!' }));
            }
        });
    }
    else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, data: null, message: "Invalid parameters." }));
    }
}