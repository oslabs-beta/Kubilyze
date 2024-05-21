const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection;
db.once('connected', ()=> console.log('MongoDb connected'))
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.pre('save', async function (next) {
    try{
        const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR)
        this.password = hash;
        next();
     }
    catch(error) {
        console.log(error)
        return next({log: error})
    }
})




module.exports = mongoose.model('users', userSchema)