const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController.js')



router.post('/signup', userController.signUp, (req, res)=> {
    res.status(200).json(res.locals.user)
})

router.post('/signin', userController.signIn, (req, res)=> {

})





module.exports = userRouterrouter