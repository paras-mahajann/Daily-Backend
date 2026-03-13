const followModel = require('../models/follow.model');
const userModel = require('../models/user.model')


async function followUserController(req,res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if(followerUsername==followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }

    const isfolloweeExist = await userModel.findOne({
        username:followeeUsername
    });

    if(!isfolloweeExist){
        return res.status(400).json({
            message:"User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(isAlreadyFollowing){
        if (isAlreadyFollowing.status === "rejected") {
            isAlreadyFollowing.status = "pending";
            await isAlreadyFollowing.save();
            return res.status(200).json({
                message:`Follow request resent to ${followeeUsername}`,
                follow:isAlreadyFollowing
            })
        }
        if (isAlreadyFollowing.status === "accepted") {
            return res.status(200).json({
                message:`You are already following ${followeeUsername}`,
                follow:isAlreadyFollowing
            })
        }
        return res.status(200).json({
            message:`Follow request already sent to ${followeeUsername}`,
            follow:isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername,
    })


    res.status(201).json({
        message:`Follow request sent to ${followeeUsername}`,
        follow:followRecord
    })
    
}

async function unfollowUserController(req,res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    });

    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
}

async function updateFollowStatusController(req,res) {
    const followeeUsername = req.user.username;
    const followerUsername = req.params.username;
    const { status } = req.body;

    if(!['accepted','rejected'].includes(status)){
        return res.status(400).json({
            message:`status must be accepted or rejected`
        })
    }

    const followRequest = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(!followRequest){
        return res.status(400).json({
            message:`follow request is not available for ${followerUsername}`
        })
    }

    followRequest.status = status;
    
    await followRequest.save();

    res.status(200).json({
        message:`your follow request status updated by ${status} successfully.`,
        followRequest
    })


}
module.exports = {
    followUserController,
    unfollowUserController,
    updateFollowStatusController
}
