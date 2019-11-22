'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('registerUser')

module.exports = function () {
    return {
        userLoginPOST: function (obj, cb) {
            user.find({ "username": obj.username }).then(res => {
                if (res[0].password == obj.password && res[0].status == "approved" && res[0].isLocked == false) {
                    let flag = true;
                    cb(null, [flag,res[0]]);
                    console.log(flag);//User logged in succesfully
                } else {
                    let flag = false;
                    cb(null, [flag,res[0]]);
                    console.log(flag);
                    //There was an error or the user is not found in the database
                }
            })
                .catch(err => {
                    cb(true, null);
                    //There was an error or the user is not found in the database
                })
        }
    }
}
