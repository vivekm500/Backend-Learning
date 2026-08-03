const express = require("express")

const mongoose = require("mongoose")

const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")
const { findById, findByIdAndDelete } = require("../models/post.model")

async function followController(req, res){

    // req.user came from midlleware identifyUser which identifies user using jwt token verification and we are taking out the id(username) of identified user 
    const followerUsername = req.user.username

    // taking out id(username) of whom user(person requesting with api) will follow from api
    const followeeUsername = req.params.username

    // check for user following self
    if(followeeUsername === followerUsername){
        return res.status(400).json({
            message: "you can't follow yourself"
        })
    }


    // check if followee(whom user want to follow) exist
    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExist){
        return res.status(404).json({
            message: "user you are trying to follow doesn't exist"
        })
    }

    // check if already following then don't create another record
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `you are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `you are now following ${followeeUsername}`,
        follow: followRecord
    })


}




// unfollow

async function unfollowUserController(req, res){

    // take out the follower and followee usernames
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    // check if followingRecord exist for the given follower and followee
    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })


    // if followRecord doesn't exist then return
    if(!isUserFollowing){
        return res.status(200).json({
            message: `you are not following ${followeeUsername}`
        })
    }

    // if their followRecord exist then delete it
    await followModel.findByIdAndDelete(isUserFollowing.id)

    res.status(200).json({
        message: `you have unfolowed ${followeeUsername}`
    })
}


module.exports = {
    followController,
    unfollowUserController
}

