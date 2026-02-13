const mongoose = require('mongoose')

const connectDb = ()=>{
    mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to DB");
    
})
}

module.exports = connectDb;