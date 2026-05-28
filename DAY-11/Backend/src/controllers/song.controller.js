const songModel = require('../models/song.model')
const storageService = require("../services/storage.service")
const id3 = require('node-id3')

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function uploadSong(req,res) {
    const songBuffer = req.file.buffer;
    const mood = req.body.mood?.toLowerCase().trim();

    const tags = id3.read(songBuffer) || {};
    const title = tags.title || req.file.originalname.replace(/\.[^/.]+$/, "");
    let posterUrl;
    
    const songFile = await storageService.uploadFile({
        buffer:songBuffer,
        filename:title+".mp3",
        folder:"/cohort-2/moodify/songs"
    })

    if(tags.image?.imageBuffer) {
        const posterFile = await storageService.uploadFile({
            buffer:tags.image.imageBuffer,
            filename:title+".jpeg",
            folder:"/cohort-2/moodify/posters"
        })

        posterUrl = posterFile.url;
    }

    const song = await songModel.create({
        title,
        url:songFile.url,
        posterUrl,
        mood
    })

    res.status(201).json({
        message:"song created successfully",
        song
    })
}

async function getSong(req,res) {
    const mood = (req.query.mood || req.params.mood)?.toLowerCase().trim();

    if(!mood) {
        return res.status(400).json({
            message:"mood query is required. Example: /api/songs?mood=happy"
        })
    }

    const song = await songModel.findOne({
        mood:new RegExp(`^${escapeRegExp(mood)}$`,'i')
    })

    if(!song) {
        return res.status(404).json({
            message:`No song found for mood: ${mood}`
        })
    }

    res.status(200).json({
        message:"song fetched successfully.",
        song
    })
}

module.exports = {uploadSong,getSong};
