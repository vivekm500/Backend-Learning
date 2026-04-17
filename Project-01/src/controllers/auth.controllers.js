const express = require("express")

const userModel = require("../models/user.model")

const crypto = require("crypto")

const jwt = require("jsonwebtoken")

const authRouter = express.Router()

// register
async function registerController(req,res){
  // destructure to get the data from req.body
  const { email, username, password, bio, profileImage } = req.body;

  // const isUSerExistByEmail = await userModel.findOne({email})

  // if(isUSerExistByEmail){
  //     return res.status(409).json({
  //         message: "user already exists with same eemail"
  //     })
  // }

  // const isUSerExistByUsername = await userModel.findOne({username})

  // if(isUSerExistByUsername){
  //     res.status(409).json({
  //         message: "user already exist with this username"
  //     })
  // }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "user already exists" +
        (isUserAlreadyExist.email == email
          ? "email already exist"
          : "username already exist"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  /**
   * -user ka data hona chahiye
   * -data unique hona chahiye
   */
  const token = jwt.sign({
    id: user._id
  },process.env.JWT_SECRET, {expiresIn: "1d"});

  res.cookie("token", token)

  res.status(201).json({
    message: "user registered successfully",
    user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage
    }
  })

}


// login
async function loginController(req,res){

    const {username, email, password} = req.body

    /**
     * username 
     * password
     * 
     * email
     * password
     */

    const user = await userModel.findOne({
        $or: [
            {
                username: username  
            },
            {
                email: email 
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValild = hash == user.password

    if(!isPasswordValild){
        return res.status(401).json({
            message: "password is invalid"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("login-token", token)

    res.status(210).json({
        messgae: "user logged in succeessfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


module.exports = {
    registerController,
    loginController
}

