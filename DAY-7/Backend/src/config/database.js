require('dotenv').config()
const mongoose  = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB");        
    })
}

module.exports = connectToDb;