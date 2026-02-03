//server create karna
//server ko config karna

const express = require('express')

const app = express()//server create ho jata hai

app.use(express.json())

const notes = []

app.post('/notes',(req,res)=>{    
    notes.push(req.body);
    console.log(notes);
    
    res.send("note created successfully.")
})

app.get('/notes',(req,res)=>{
    res.send(notes);
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index];
    res.send("note deleted successfully.")
    console.log(notes); 
})

app.patch('/notes/:index',(req,res)=>{
    const newDesc = req.body.description;
    notes[req.params.index].description = newDesc;
    res.send('Your Description updated successfully.')
})

module.exports = app