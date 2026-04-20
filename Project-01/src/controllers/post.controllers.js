const express = require("express")

const mongoose = require("mongoose")

const postModel = require("../models/post.model")

const Imagekit = require("@imagekit/nodejs")

const {toFile} = require("@imagekit/nodejs")

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
    });

    res.send(file)
}

module.exports = {
    createPostController
}