const express = require("express")

const mongoose = require("mongoose")

const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")
const { findById, findByIdAndDelete, findOneAndUpdate } = require("../models/post.model")

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

    // check if follow request is already made
    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    // if follow request is already made then show messages according to its status
    if(followRequest){
    if(followRequest.status === "accepted"){
        return res.status(200).json({
            message: `you are already following ${followeeUsername}`,
            followRequest
        })
    }


    if(followRequest.status === "pending"){
        return res.status(200).json({
            meassage: `follow request already sent to ${followeeUsername}`,
            followRequest
        })
    }

    if(followRequest.status === "rejected"){
        return res.status(200).json({
            message: `follow request rejected, you can't6 follow ${followeeUsername}`,
            followRequest
        })
    }

}

    // if(isAlreadyFollowing){
    //     return res.status(200).json({
    //         message: `you are already following ${followeeUsername}`,
    //         follow: isAlreadyFollowing
    //     })
    // }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `follow request sent successfully`,
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

// follow request accept controller
async function followAcceptController(req, res){

    const followerUsername = req.params.username
    const followeeUsername = req.user.username

    const existing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!existing){
        return res.status(404).json({
            message: "follow request doesn't exist"
        })
    }

    if(existing.status === "accepted"){
        return res.status(200).json({
            message: "already accepted"
        })
    }

    if(existing.status === "rejected"){
        return res.status(200).json({
            message: "already rejected"
        })
    }

    let followRecord

    if(existing.status === "pending"){
       followRecord = await followModel.findOneAndUpdate(
          {
            follower: followerUsername,
            followee: followeeUsername,
          },
          {
            status: "accepted",
          },
          {
            new: true, //new: true returns the updated document.new: true returns the updated document.
          }
        );
    }

    return res.status(200).json({
        message: "follow request accepted",
        follow: followRecord
    })
}



// follow request reject controller
async function followRejectController(req, res){

    const followerUsername = req.params.username;
    const followeeUsername = req.user.username;

    const existing = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });

    if (!existing) {
      return res.status(404).json({
        message: "follow request doesn't exist",
      });
    }

    if (existing.status === "accepted") {
      return res.status(409).json({
        message: "already accepted",
      });
    }

    if (existing.status === "rejected") {
      return res.status(409).json({
        message: "already rejected",
      });
    }

    let followRecord;

    if (existing.status === "pending") {
      followRecord = await followModel.findOneAndUpdate(
        {
          follower: followerUsername,
          followee: followeeUsername,
        },
        {
          status: "rejected",
        },
        {
          new: true, //new: true returns the updated document.new: true returns the updated document.
        },
      );
    }

    return res.status(200).json({
      message: "follow request rejected",
      follow: followRecord,
    });
}


module.exports = {
    followController,
    unfollowUserController,
    followAcceptController,
    followRejectController
}

