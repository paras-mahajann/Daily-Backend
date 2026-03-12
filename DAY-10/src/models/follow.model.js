const mongoose = require('mongoose')


const followSchema = new mongoose.Schema({
    follower: {
        type:String
    },
    followee: {
        type:String
    }
}, {
    timestamps:true
})


const followModel = mongoose.model("follows",followSchema);

module.exports = followModel;