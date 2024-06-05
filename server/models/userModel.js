const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection;
db.once('connected', ()=> console.log('MongoDb connected'))
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

/* Creating the schema for you model. This schema shows the proper and required fields
 that are required to create a new document  */
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accesskey: String,
    secretkey: String,
    sessiontoken: String,
    region: String
})

/* .pre method with 'save' as the first argumemt, allows this function to run whenever
you call db.create(), allowing the password you send to the database to be hashed before it is sent.
*/
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



// return a model instance that adheres to the schema declared above
// this is the model we use to make queries
module.exports = mongoose.model('users', userSchema)