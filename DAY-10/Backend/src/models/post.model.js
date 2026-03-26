const { mongo } = require('mongoose');
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"img-url is required for creating a post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",        
        require:[true,"userID is required for creating a post"]
    }

},{
    timestamps:true
})


const postModel = mongoose.model('posts',postSchema);

module.exports = postModel;
