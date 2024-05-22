const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController.js')



userRouter.post('/signup', userController.signUp, (req, res)=> {
    res.status(200).json(res.locals.user)
})

userRouter.post('/signin', userController.signIn, (req, res)=> {

})





module.exports = userRouter