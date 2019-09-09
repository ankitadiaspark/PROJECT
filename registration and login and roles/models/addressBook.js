const mongoose = require('mongoose');

const newLocal = /@gmail\.com$/;
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
        required: true
    },
    email: {
        type: String,
        required: true,
        $regex: newLocal
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword:
    {
        type: String,
        required: true
    },
    role:
    {
        type: String,
      
        default:'user',
       
        value:['user','admin']
    },
    status:{
        type:String,
        default:'not approved',
        value:['approved','not approved']
    },
    varifiedUser:{
        type:Boolean,
        default:false
       }

});

let registerUser = mongoose.model('registerUser', registerSchema);
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


// if((registerUser.role)&& (registerUser.status.value['approved']))
// {
//     return registerUser.varifiedUser=true;
// }

exports.insertData = (data) => {
    return new Promise((resolve, reject) => {
       
        var insertData = new registerUser(data)
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

exports.updateData = (toUpdate, data) => {
    return new Promise((resolve, reject) => {
        if(registerUser.role.value['admin']&&registerUser.status.value['approved']){
            return registerUser.varifiedUser=true;
        }
        let prevData = toUpdate
        let newData = {
            $set: data
        }
        registerUser.update(prevData, newData, { multi: true, new: true })
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
