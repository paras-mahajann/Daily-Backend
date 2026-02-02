const express = require('express');

const app = express(); //server instance create kiya

app.get('/',(req,res)=>{
    res.send("Hello World!!");
})

app.listen(3000)//server start kiya