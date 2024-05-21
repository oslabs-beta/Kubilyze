const db = require('../models/userModel.js')
const userController = {}
const bcrypt = require('bcryptjs')

userController.signUp = (req, res, next)=> {
    const{username, password} = req.body
    db.create({username, password})
    .then((data)=> {
        console.log(data)
        res.locals.user = data
        return next();
    })
    .catch((e)=> {
        next({log:e})
    })

}

userController.signIn = (req, res, next)=> {
    const {username, password} = req.body;
    

}











module.exports = userController