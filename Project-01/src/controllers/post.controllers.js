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

module.exports = {
    createPostController
}