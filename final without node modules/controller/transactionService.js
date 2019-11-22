const companyModel = require('../models/companyAccModel');
const accHandling = require('../helper/accHandling');
const nodemailer = require('nodemailer');
const userModel=require('../models/addressBook')
var otpGenerator = require('otp-generator')



var transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true,
auth: {
// username of gmail and password
user: 'inbbanking01@gmail.com',
pass: 'admin123$$'
}
});

function sendEmail(mail) {
var mailOptions = {

from: 'inbbanking01@gmail.com',
to: mail.to,
subject: 'OTP for varification from INB BANK',
html: `<h3>Dear${mail} </h3>

Thank you so much for choosing INB BANK for valuable transaction.
kindly use this otp for varification of identity to proceed a secure transaction.

We look forward to seeing you soon so that you can enjoy our services.<br>

Please, do contact us if you have additional queries. Thanks again!<br>
<h2>
Best regards, <br>

Indian Net Bank <br>

team-4A
</h2>`

};

transporter.sendMail(mailOptions, function (error, info) {
if (error) {
console.log(error)
} else {
console.log('Email sent: ' + info.response);
}
});
}











async function transaction(req, res) {
var mail = otpGenerator.generate(6, { upperCase: false, specialChars: false });
console.log('otpgenerr'+mail);

const body = req.body;
if (!accHandling.isEmpty(body)) {
body.type = body.type.toLowerCase();
const user = await userModel.findAl({accountNumber: body.accountNumber});
if (user) {
let toAccount;
if (body.type === 'company') {
toAccount = await companyModel.findAl({companyName: body.companyName});
} else if (body.type === 'user') {
toAccount = await userModel.findAl({accountNumber: body.toAccountNumber});
}
if(toAccount) {
const withdrawData = await accHandling.withdraw(user, body.amount);
if (withdrawData.success) {
const depositData = await accHandling.deposit(toAccount, body.amount, body.type);
if(depositData.success) {
const receipt = await accHandling.transactionReceipt(body.accountNumber, toAccount.accountNumber, body.amount, body);
const responseData = {success: true, data: {msg: 'Transaction successful', balance: parseFloat(user.balance) - parseFloat(body.amount)}}
if (receipt.success) {
responseData.data['receipt'] = receipt.data.receipt;
responseData.data['transaction_id'] = receipt.data.transaction_id;
}
res.send(responseData);
sendEmail(mail);
} else {
res.send({success: false, error: depositData.error});
}
} else {
res.send({success: false, error: withdrawData.error});
}
} else {
res.send({success: false, error: 'To account does not exists'});
}
} else {
res.send({success: false, error: 'User not found'});
}
} else {
res.send({success: false, error: 'Please insert a body'});
}
}

module.exports = {
transaction
}



