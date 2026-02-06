require('dotenv').config()
const mongoose = require('mongoose')


const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database");        
    })
}

module.exports  = connectToDb;