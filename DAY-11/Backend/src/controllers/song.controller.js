const songModel = require('../models/song.model')
const id3 = require('node-id3')

async function uploadSong(req,res) {
    
    const tags = id3.read(req.file.buffer);
    
    console.log(tags);
}

module.exports = {uploadSong};