const express = require("express")

const authRouter = express.Router()

const userModel = require("../models/auth.model")

const crypto = require("crypto")

const jwt =require("jsonwebtoken")

// REGISTER API
/**
 * POST -> '/api/auth/register'
 */
authRouter.post('/register', async (req,res)=>{

    // destructure schema to get the data 
   const {name, email, password} = req.body;

   // check if any other user already exist with the enetered email
   const isUserExist = await userModel.findOne({email})

   // if already exist then don;t register the user
   if(isUserExist){
    return res.status(409).json({
        message:"user already exist"
    })
   }

   // if no user already exist with the enetered email then register the user and save it's info in database
   const user = await userModel.create({
    name,
    email,
    // saving the hashed password
    password: crypto.createHash('sha256').update(password).digest('hex')
   })

   // creating a jwt_token for the user
   const token = jwt.sign({
    id:user._id
}, process.env.JWT_SECRET, {expiresIn: "1h"})

// saving the generated jwt_token in cookie-storage 
res.cookie("jwt_token", token)


res.status(201).json({
    message: "user registered successfully",
    user: {
        name: user.name,
        email: user.email
    }
})

})


// AUTHENTICATION API
authRouter.get('/get-me', async (req,res)=>{

    // find the jwt_token stored in cookie-storage
    const token = req.cookies.jwt_token

    // veify the token if it is signed by our JWT_SECRETE
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decoded)

    // find the user whose token has been verified
    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })
})



// LOGIN API
authRouter.post('/login', async (req,res)=>{

    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            name: user.name,
            email: user.email
        }
    })
})

module.exports = authRouter