const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection;
db.once('connected', ()=> console.log('MongoDb connected'))


const userSchema = new mongoose.Schema({
    usernmae: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})




module.exports = mongoose.model('users', userSchema)