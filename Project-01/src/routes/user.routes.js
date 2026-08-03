const express = require("express")

const userRouter = express.Router()

const userController = require("../controllers/user.controller")

const identifyUser = require("../middleware/auth.middleware")

/**
 * @route post -> "/api/users/follow/:username"
 * @description follow a user
 * @access private
 */

userRouter.post("/follow/:username", identifyUser, userController.followController)


/**
 * @route post -> "/api/users/unfollow/:username"
 * @description unfollow a user
 * @access private
 */

userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)




module.exports = userRouter