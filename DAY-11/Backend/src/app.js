const express = require('express')
const cookieParser = require('cookie-parser')
const multer = require('multer')



const app = express();
app.use(express.json());
app.use(cookieParser())


const authRoutes = require('./routes/auth.route')
const songRoutes = require('./routes/song.route')

app.use('/api/auth',authRoutes);
app.use('/api/songs',songRoutes);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: "File is too large. Maximum upload size is 50MB"
        })
    }

    next(err)
})




module.exports = app;
