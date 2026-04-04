const mongoose = require('mongoose')

const blackListSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required for blacklisting."]
    }
},{timestamps:true});


const blacklistModel = mongoose.model('blacklist',blackListSchema);

module.exports = blacklistModel;    