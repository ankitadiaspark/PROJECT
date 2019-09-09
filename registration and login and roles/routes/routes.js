var express = require('express');
var router = express.Router();
const contactCtrl = require('../controller/contactCtrl');
var user = require('../service/userService');
/* GET home page. */

router.get('/register', contactCtrl.get);

router.post('/register', contactCtrl.create);

router.put('/register/:email', contactCtrl.update);

router.delete('/register/:email', contactCtrl.remove);

module.exports.userLoginPOST = function (req, res, next) {
    user.userLoginPOST(req, res, next);
};

module.exports = router;
