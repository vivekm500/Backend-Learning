const express = require("express")

const mongoose = require("mongoose")

const postModel = require("../models/post.model")

const Imagekit = require("@imagekit/nodejs")

const {toFile} = require("@imagekit/nodejs")

const jwt = require("jsonwebtoken")

require("dotenv").config();


const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req,res){
    console.log(req.body, req.file)

    
    // uploading image to imagekit from server and getting a url
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "Test",
      folder: "cohort-2-insta-clone-posts"  // folder on imagekit where images will be stored
    });

    // res.send(file)


    // creating post
    const post  = await postModel.create({
      caption: req.body.caption,
      imgUrl: file.url,
      user: req.user.id
    })

    res.status(201).json({
      message: "post created successfully",
      post
    })
}



// getPostController -> take out the all posts of the user who has requested it and also authorise the user before getting its all the posts
async function getPostController(req, res){
  
  // extract userID from verified users decoded data
  const userId = req.user.id; // req.user came from auth middleware which stores decoded data of user

  // find the user with its userId in database
  const posts = await postModel.find({
    user: userId,
  });

  // return the message and users posts
  res.status(200).json({
    message: "posts fetched successfully",
    posts,
  });
}



// getPostDetailsController -> returns details about a specific post with the id and also checks if the post belongs the user that has requested its details

// Controller to fetch details of a specific post
async function getPostDetailsController(req, res){

 

  // -------------------------------------------------------
  // STEP 5: Extract the logged-in user's ID from the
  // decoded JWT payload.
  //
  // Example decoded object:
  // {
  //   id: "687ab8c2...",
  //   email: "vivek@gmail.com",
  //   iat: ...,
  //   exp: ...
  // }
  // -------------------------------------------------------
  const userId = req.user.id // req.user came from auth middleware which stores decoded data of user


  // -------------------------------------------------------
  // STEP 6: Get the post ID from the URL.
  //
  // Example route:
  // GET /posts/687fd67b1234
  //
  // req.params becomes:
  // {
  //    postId: "687fd67b1234"
  // }
  // -------------------------------------------------------
  const postId = req.params.postId;


  // -------------------------------------------------------
  // STEP 7: Search the database for the post using its ID.
  //
  // await pauses execution until MongoDB returns the result.
  // -------------------------------------------------------
  const post = await postModel.findById(postId);


  // -------------------------------------------------------
  // STEP 8: If no post exists with this ID,
  // return 404 Not Found.
  // -------------------------------------------------------
  if(!post){
    return res.status(404).json({
      message: "Post not found"
    });
  }


  // -------------------------------------------------------
  // STEP 9: Authorization Check
  //
  // Authentication answered:
  // "Who is the user?"
  //
  // Authorization answers:
  // "Is this user allowed to access this post?"
  //
  // post.user is stored as a MongoDB ObjectId.
  // userId from JWT is a string.
  //
  // Convert ObjectId to string before comparing.
  // -------------------------------------------------------
  const isValidUser = post.user.toString() === userId;


  // -------------------------------------------------------
  // STEP 10: If the logged-in user does NOT own this post,
  // deny access with 403 Forbidden.
  // -------------------------------------------------------
  if(!isValidUser){
    return res.status(403).json({
      message: "Forbidden content"
    });
  }


  // -------------------------------------------------------
  // STEP 11: Everything is valid.
  //
  // ✔ User is authenticated.
  // ✔ Token is valid.
  // ✔ Post exists.
  // ✔ Logged-in user owns this post.
  //
  // Return the post details.
  // -------------------------------------------------------
  return res.status(200).json({
    message: "Post fetched successfully",
    post
  });
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
};