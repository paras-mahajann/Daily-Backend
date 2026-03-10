const mongoose = require('mongoose')


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followee is required"]
    }
}, {
    timestamps:true
})


const followModel = mongoose.Model("follows",followSchema);

module.exports = followModel;