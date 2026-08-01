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

    // taking out token saved in cookie-storage
    const token = req.cookies.token

    if(!token){
      return res.status(401).json({
        message: "Token not provided, Unauthorized acess"
      })
    }

    // extracting(decoding) data from token and verifying token with our JWT_SECRET key
    let decoded;
    
    try{
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
      return res.status(401).json({
        message:"user not authorized"
      })
    }

    console.log(decoded)

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
      user: decoded.id
    })

    res.status(201).json({
      message: "post created successfully",
      post
    })
}



// getPostController -> take out the all posts of the user who has requested it and also authorise the user before getting its all the posts
async function getPostController(req, res){

  // take out the jwt token saved in users cookie storage
  token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "No token found",
    });
  }

  // verify the token if it is generated bu our server and if it is found correct then store the all users data in decoded
  let decoded;

  try{
  decoded = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch(err){
    return res.status(410).json({
      message: "Token Invalid, user is not authorised to acess this data"
    })
  }

  // extract userID from verified users decoded data
const userId = decoded.id

// find the user with its userId in database
const posts = await postModel.find({
  user: userId
})

// return the message and users posts
  res.status(200).json({
    message: "posts fetched successfully",
    posts
  })


}



// getPostDetailsController -> returns details about a specific post with the id and also checks if the post belongs the user that has requested its details

// Controller to fetch details of a specific post
async function getPostDetailsController(req, res){

  // -------------------------------------------------------
  // STEP 1: Get the JWT token stored in the user's cookies.
  // The browser automatically sends this cookie with every request.
  // -------------------------------------------------------
  const token = req.cookies.token;


  // -------------------------------------------------------
  // STEP 2: Check whether the token exists.
  // If the user is not logged in, there will be no token.
  // In that case, stop execution and return 401 Unauthorized.
  // -------------------------------------------------------
  if (!token) {
    return res.status(401).json({
      message: "No token found, Unauthorised access",
    });
  }


  // -------------------------------------------------------
  // STEP 3: Variable to store the decoded payload after
  // successfully verifying the JWT.
  // Initially it is undefined.
  // -------------------------------------------------------
  let decoded;


  // -------------------------------------------------------
  // STEP 4: Verify the JWT.
  //
  // jwt.verify() checks:
  // ✔ Token is correctly formatted
  // ✔ Token was signed using OUR secret key
  // ✔ Token has not been modified (tampered)
  // ✔ Token has not expired
  //
  // If everything is valid, it returns the payload
  // (user id, email, etc.).
  //
  // If verification fails, an exception is thrown and
  // execution jumps to the catch block.
  // -------------------------------------------------------
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  }
  catch(err){
    return res.status(401).json({
      message: "Invalid token"
    });
  }


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
  const userId = decoded.id;


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