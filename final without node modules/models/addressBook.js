const mongoose = require('mongoose');
var cryptography = require('../helper/cryptography');
var uniqueValidator = require('mongoose-unique-validator');
const newLocal = /@gmail\.com$/;
const usern = /^[a-zA-Z0-9]+$/;
const sha256 = require('simple-sha256')

const registerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },

    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    address3: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true,

    },
    phone: {
        type: Number,
        required: true,

    },
    username: {
        type: String,
        required: true,
        unique: true,
        // match: /^[a-zA-Z0-9]+$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        $regex: newLocal
    },
    password: {
        type: String,
        required: true
    },
    role:
    {
        type: String,

        default: 'user',

        value: ['user', 'admin']
    },
    status: {
        type: String,
        default: 'not approved',
        value: ['approved', 'not approved']
    },
    verifiedUser: {
        type: Boolean,
        default: false
    },
    accountNumber: {
        type: String,
        default: null
    },
    balance: {
        type: Number,
        default: 0
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,

        default: Date.now
    }

    //    AccountDetails:[account,accountNumber]


});

let registerUser = mongoose.model('registerUser', registerSchema);
registerSchema.plugin(uniqueValidator);

function accountNumberGenerator(accountNumber) {
    let temp;
    let ac = '';
    for (let i = 0; i < 15; i++) {
        if ((accountNumber[i] >= 'a' && accountNumber[i] <= 'z') || (accountNumber[i] >= 'A' && accountNumber[i] <= 'Z')) {
            temp = accountNumber.charCodeAt(i);
        } else {
            temp = accountNumber[i];
        }
        ac += temp;
    }
    return ac.substring(0, 15);
}

exports.findAll = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.find(data)
            .then((res) => {
                return resolve(res)
            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}
exports.findAl = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.findOne(data)
            .then((res) => {
                return resolve(res)
            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}


//to get all the users whose account has been locked
exports.lockuser = (data) => {
    return new Promise((resolve, reject) => {


        registerUser.find({ isLocked: { $eq: true } })
            .then(res => {

                return resolve(res)


            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}



exports.insertData = (data) => {
    return new Promise((resolve, reject) => {
        var insertData = new registerUser(data)
        if (insertData.password)
            insertData.password = cryptography.sha256(insertData.password);

        return insertData.save()
            .then((res) => {
                if (res) {
                    return resolve(res)
                } else {
                    let badResponse = {
                        msg: "Data Not Inserted"
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Inserted",
                    error: err
                }
                return reject(badResponse)
            })
    })
}




//for admin dashboard to approve user
exports.updateData = (toUpdate, data) => {
    return new Promise(async (resolve, reject) => {
        const hashString = Date.now().toString() + data.email + data.username;
        let accountNumber = await sha256(hashString);
        accountNumber = 'AC' + accountNumberGenerator(accountNumber);
        let firstData = { accountNumber: accountNumber, verifiedUser: true, status: "approved" };
        let prevData = toUpdate

        registerUser.updateOne(prevData, firstData, { multi: true, new: true })
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Updated"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "No Such Email Exist",
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Updated",
                    error: err
                }
                return reject(badResponse)
            })
    })
}

exports.changeStatus = (toUpdate, data) => {
    return new Promise((resolve, reject) => {

        let firstData = { isLocked: true };
        let prevData = toUpdate

        registerUser.updateOne(prevData, firstData, { multi: true, new: true })
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Updated"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "No Such username Exist",
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Updated",
                    error: err
                }
                return reject(badResponse)
            })
    })
}




exports.changeStatusByAdmin = (toUpdate, data) => {
    return new Promise((resolve, reject) => {

        let firstData = { isLocked: false };
        let prevData = toUpdate

        registerUser.updateOne(prevData, firstData, { multi: true, new: true })
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Updated"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "No Such Email Exist",
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Updated",
                    error: err
                }
                return reject(badResponse)
            })
    })
}



///////----------------------------------


exports.removeData = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.remove(data)
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Deleted"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "no such data exist"
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Deleted",
                    error: err
                }
                return reject(badResponse)
            })
    })
}












exports.findmini = (data) => {
    return new Promise((resolve, reject) => {
        registerUser.findOne(data)
            .then((res) => {
                return resolve(res.accountNumber, res.balance);
            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}

function rateOfInterest() {
    let amount;
    let now = new Date();
    console.log(now);
    let nowMinutes = now.getMinutes();
    let nowTime = now.getTime();
    console.log(nowTime + "time")
    console.log(nowMinutes + "now")
    registerUser.find({ account: "saving" }).then(res => {
        console.log(res[0]);
        let balance = res[0].balance;
        console.log(balance+"balance@")
        let date = res[0].date;
        console.log(date + "date")
        let minutes = date.getMinutes();
        let time = date.getTime();
        let difference = nowTime - time;
        console.log(difference + "difference")
        console.log(minutes);
        let rateMinute = minutes + 8;
        console.log(rateMinute + "rateeeeeeee");
        if (difference>=200000) {

            let rate = (1 / 10);
            console.log(rate+"rate")
            let ttime = difference / 360000;
            console.log(ttime+"ttime")
            let interest = balance * rate * ttime;
            console.log(interest+"interest")
            amount = interest + balance;

        }
        else {
            console.log("error")
        }
    }).catch(err => {
        return error;
    })
    return amount;
}


exports.updateBalance = (toUpdate, data) => {
    return new Promise(async (resolve, reject) => {

     let   balance = rateOfInterest();
        console.log(balance + "balance")
        let firstData = { balance: balance };
        console.log(balance+"balance1")
        let prevData = toUpdate

        registerUser.updateOne(prevData, firstData, { multi: true, new: true })
            .then((res) => {
                if (res.n) {
                    let response = {
                        msg: "Data Updated"
                    }
                    return resolve(response)
                } else {
                    let badResponse = {
                        msg: "No Such user Exist",
                    }
                    return reject(badResponse)
                }
            })
            .catch((err) => {
                let badResponse = {
                    msg: "Data Not Updated",
                    error: err
                }
                return reject(badResponse)
            })
    })
}

// router.get("/savingUser/increaseRate", (req, res) => {
//     let rate = (1 / 10);
//     let time = (6 / 12);

//     let interest = rate * time;
//     userfind.findOneAndUpdate({ account: "saving" }, { $set: { balance: interest } }, function (err, doc) {
//         if (err) {
//             res.send(err)
//             console.log("Something wrong when updating data!");
//         }
//         else {
//             let date = doc.date;
//             let day = ("0" + date.getDate()).slice(-2);
//             let year = date.getFullYear();
//             let month = ("0" + (date.getMonth() + 1)).slice(-2);
//             // current hours
//             let hours = date.getHours();

//             // current minutes
//             let minutes = date.getMinutes();

//             // current seconds
//             let seconds = date.getSeconds();
//             let now = new Date();
//             console.log(now)
//             console.log(hours)
//             console.log(minutes)
//             console.log(seconds)
//             console.log(month)
//             console.log(year)
//             console.log(day);
//             res.send("data updated");
//             console.log(doc);

//         }
//     });
// });


exports.update = async (findData, data) => {
    const resData = await registerUser.updateOne(findData, data);
    return resData;
}