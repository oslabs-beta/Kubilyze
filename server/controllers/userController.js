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
    db.findOne({username})
    .then(data=> {
        console.log(data)
        if(data) {
        bcrypt.compare(password, data.password)
        .then((result)=> {
            if(result) {
                res.locals.user = data
                return next()
            }
         res.status(400).json('Password is incorrect')
        })}
        else{
            res.status(400).json('Username does not exist')
        }
    })
    .catch((e)=> {
        return next({log:e})
    })
    

}











module.exports = userController