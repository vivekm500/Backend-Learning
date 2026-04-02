// we will create register api and moduleexport this and will be used in app.js 

const express = require("express")
const userModel = require("../models/user.model")

const jwt = require("jsonwebtoken")  // for generating jwt token

const crypto = require("crypto")


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

     // converting password into hash
     const hash = crypto.createHash("md5").update(password).digest("hex")

     // if user doesn't exists with the entered email then create thtat user
     const user = await userModel.create({
       name,
       email,
       password: hash,  // database me hash save karayenge
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


/**
 * /api/auth/protected
 */
authRouter.post("/protected", (req,res)=>{
   console.log(req.cookies)

   res.status(200).json({
      message: "this is protected route"
   })
})


/**
 * POST -> '/api/auth/login'
 // this callback/fat-arrow func is also called controller
 */
authRouter.post("/login", async (req,res)=>{

   // destructure to get email and password
   const {email, password} = req.body

   // find one user with the entered email
   const user = await userModel.findOne({email})

   // if no user exists with the entered email
   if(!user){
      return res.status(404).json({
         message: "user not found with this email"
      })
      }

      // check the enetered password with user password
      const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

      // if enetered password doesn't match
      if(!isPasswordMatched){
         return res.status(401).json({
            message: "Invalid password"
         })
      }

      // if password matches then generate a JWT token
      const token = jwt.sign({
         id: user._id,
      }, process.env.JWT_SECRET)

      // saving generated jwt token in cookie-storage
      res.cookie("jwt_token", token)

      // user logged in successfully
      res.status(200).json({
         message: "user logged in",
         user
      })
})

module.exports = authRouter

