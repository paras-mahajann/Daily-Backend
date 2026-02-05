// server ko start karna 
// server ko database se connect karna
const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://paras:DYYsIs9MI9rRqBDL@cluster0.pnya9gi.mongodb.net/day-5")
    .then(()=>{
        console.log("Server is connected to the database");
        
    })
}

connectToDb();


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})