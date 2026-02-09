const express = require('express')
const noteModel = require('./models/note.model')

const app = express();
app.use(express.json())


app.post('/api/notes',async (req,res)=>{
    const {title,description} = req.body;
    const note = await noteModel.create({title,description});

    res.status(201).json({
        message:"note created successfully",
        note
    })
    
})

app.get('/api/notes',async (req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

app.patch('/api/notes/:id',async (req,res)=>{
    const {description} = req.body;
    await noteModel.findByIdAndUpdate(req.params.id,{description});
    res.status(200).json({
        message:"note updated successfully",
    })
})

app.delete('/api/notes/:id',async (req,res)=>{
    await noteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:"note deleted successfully"
    })
})

module.exports = app;