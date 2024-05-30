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
// this controller method handles the verification of a user that it sent to the server
userController.signIn = (req, res, next)=> {
    const {username, password} = req.body;
    db.findOne({username}) // check the database for the username
    .then(data=> {
        console.log(data)
        // if the the query comes back with a user, we now compare that users hashed password with the password they inputed and sent to the server
        if(data) {
        bcrypt.compare(password, data.password)
        .then((result)=> {
            if(result) { // if this result is truthy, the bcrypt compare method return true, so the user is verifed 
                res.locals.user = data
                return next()
            }
            // if we reach this line, the bcrypt compare method return false, meaning the password sent to the server is not correct 
         res.status(400).json('Password is incorrect')
        })
        .catch(e => {
            return next({log:e})
        })}
        // if db.findOne returns null, we hit this else telling us the username that was sent to server does not exist in the database
        else{
            res.status(400).json('Username does not exist')
        }
    })
    .catch((e)=> {
        return next({log:e})
    })
}











module.exports = userController