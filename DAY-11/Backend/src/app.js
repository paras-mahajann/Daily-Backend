const express = require('express')
const cookieParser = require('cookie-parser')



const app = express();
app.use(express.json());
app.use(cookieParser())


const authRoutes = require('./routes/auth.route')
const songRoutes = require('./routes/song.route')

app.use('/api/auth',authRoutes);
app.use('/api/songs',songRoutes);




module.exports = app;