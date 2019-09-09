'use strict'

const mongoose = require('mongoose');
// const logger = require('../helper/logger');
const registeredUser=require('../models/addressBook');

let flag=false;
module.exports = function () {
    return {
        userLoginPOST: function (obj, cb) {
            //These details will be fetched from DB
            var userObj = {
               
                username: '',
                password: '',
               
            };
            if(userObj.username==registeredUser.username){
                if(userObj.password==registeredUser.password){
                      return flag=true;}}
            
            //Assuming the user is logging-in with valid credentials.
            if (flag==false)
                cb(false, null);//There was an error or the user is not found in the database
            else
                cb(true, userObj);//User logged in succesfully
        }
    }
}