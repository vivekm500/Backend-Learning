const express = require("express")

const userRouter = express.Router()

const userController = require("../controllers/user.controller")

const identifyUser = require("../middleware/auth.middleware")
const authRouter = require("./auth.routes")

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


/**
 * @route patch -> "/api/users/follow/:username/accept"
 * @description accept a pending follow request
 * @acess private
 */

userRouter.patch("/follow/:username/accept", identifyUser, userController.followAcceptController)


/**
 * @route patch -> "/api/users/follow/:username/reject"
 * @description reject a pending follow request
 * @access private
 */
userRouter.patch("/follow/:username/reject", identifyUser, userController.followRejectController)


module.exports = userRouter