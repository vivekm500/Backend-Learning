// we will create register api and moduleexport this and will be used in app.js 

const express = require("express")
const userModel = require("../models/user.model")

const jwt = require("jsonwebtoken")  // for generating jwt token


const authRouter = express.Router() // agr app.js ke alawa kisi aur file me routes/api create krni ho "express.Router()" ki jarurat padti hai


authRouter.post('/register', async (req,res)=>{
     const {name, email, password} =  req.body

     const isUserAlreadyExist = await userModel.findOne({email})

     // if user exist already return from here
     if(isUserAlreadyExist){
      return res.status(400).json({
         message: "user already exist with this email"
      })
     }

     // if user doesn't exists with the entered email then create thtat user
     const user = await userModel.create({
       name,
       email,
       password,
     });

     // method to create jwt token with signature
     const token  = jwt.sign({
      id:user._id,
     }, process.env.JWT_SECRET)

     // pasing jwt token in cookies-storage
     res.cookie("jwt_token", token)

     res.status(201).json({
        message: "user registered",
        user,
        token
     })
})

module.exports = authRouter

