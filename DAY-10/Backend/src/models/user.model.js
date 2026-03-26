const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User name is already exists!"],
        required:[true,"User name is required!"]
    },
    email:{
        type:String,
        unique:[true,"Email is already exist!"],
        required:[true,"Email required!"]
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
        select:false
    },
    bio:String,
    profileImage:{
        type:String,
        default:'https://placehold.co/80x80/png?text=User'
    }
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;
