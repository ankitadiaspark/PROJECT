const model = require('../models/addressBook')
const joi = require('joi')
var cryptography = require('../helper/cryptography');

exports.get = (req, res) => {
    let query = req.query
    const schema = {
        firstName: joi.string(),
        lastName: joi.string(),
        account: joi.string(),
        address1: joi.string(),
        address2: joi.string(),
        address3: joi.string(),
        city: joi.string(),
        state: joi.string(),
        pin: joi.string(),
        phone: joi.string().length(10),
        username: joi.string(),
        email: joi.string().email(),
        password: joi.string(),
        confirmPassword: joi.string(),
        role:joi.string(),
        status:joi.string()
        
    };
    const { error } = joi.validate(query, schema);
    if (error) {
        res.status(400)
        res.send(error)

    }
    else {
        model.findAll(req.query)
            .then((result) => {
                res.status(200)
                res.send(result)
            })
            .catch((e) => {
                res.send(e)
            })
    }
}

exports.create = (req, res) => {
    let body = req.body
   
    const schema = {
        firstName: joi.string(),
        lastName: joi.string(),
        account: joi.string(),
        address1: joi.string(),
        address2: joi.string(),
        address3: joi.string(),
        city: joi.string(),
        state: joi.string(),
        pin: joi.string(),
        phone: joi.string().length(10),
        username: joi.string(),
        email: joi.string().email(),
        password: joi.string(),
        confirmPassword: joi.string(),
        role:joi.string(),
        status:joi.string()
    };
   
    
    const { error } = joi.validate(body, schema);
    if (error) {
        res.status(400)
        res.send(error)

    }
    else {
       
        model.insertData(body)
            .then((response) => {
                res.status(200);
                res.send(response)
            })
        
            .catch((err) => {
                res.status(500);
                res.send(err)
            })
    }
}

exports.update = (req, res) => {
    const paramsSchema = {
        email: joi.string().email().required(),
    }
    const { error } = joi.validate(req.params, paramsSchema);
    if (error) {
        res.status(400)
        res.send(error)
    } else {
        let body = req.body
        const schema = {
            firstName: joi.string(),
            lastName: joi.string(),
            account: joi.string(),
            address1: joi.string(),
            address2: joi.string(),
            address3: joi.string(),
            city: joi.string(),
            state: joi.string(),
            pin: joi.string(),
            phone: joi.string().length(10),
            username: joi.string(),
            email: joi.string().email(),
            password: joi.string(),
            confirmPassword: joi.string(),
            role:joi.string(),
        status:joi.string(),
        varifiedUser:string()
        };
        const { error } = joi.validate(body, schema);
        if (error) {
            res.status(400)
            res.send(error)
        }
        else {
            model.updateData(req.params ,req.body)
                .then((response) => {
                    res.status(200);
                    res.send(response)
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err)
                })
        }
    }
}

exports.remove = (req, res) => {
    const paramsSchema = {
        email: joi.string().email().required(),
    }
    const { error } = joi.validate(req.params, paramsSchema);
    if (error) {
        res.status(400)
        res.send(error)
    } else {
        model.removeData(req.params)
            .then((response) => {
                res.status(200);
                res.send(response)
            })
            .catch((err) => {
                res.status(400);
                res.send(err)
            })
    }
}

