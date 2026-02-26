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
        required:[true,"Password is required!"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/2oxiybuer/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.avif'
    }
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;