const followModel = require('../models/follow.model');


async function followUserController(req,res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    
}

module.exports = {
    followUserController
}