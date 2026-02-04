const express = require('express')

const app = express()

app.use(express.json())

const notes = []


app.get('/notes',(req,res)=>{
    res.status(200).json({
        notes: notes
    })
})

app.post('/notes',(req,res)=>{
    const newData = req.body;
    notes.push(newData)
    res.status(201).json({
        message:"Note created successfully."
    })
    
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.status(204).json({
        message: "note deleted successfully"
    })
})

app.patch('/notes/:index',(req,res)=>{
    const newDesc = req.body.description;
    notes[req.params.index].description = newDesc;
    res.status(200).json({
        message: "note updated successfully"
    })
})



module.exports = app