const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["sad","happy","angry"],
            message:"Enum this is "
        },
        lowercase:true,
        trim:true
    }
})

const songModel = mongoose.model("songs",songSchema);


module.exports = songModel;
