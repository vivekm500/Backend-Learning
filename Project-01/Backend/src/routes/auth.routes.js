const express = require("express")

const authRouter = express.Router()

const authController = require("../controllers/auth.controllers")

const identifyUser = require("../middleware/auth.middleware")

// POST - '/api/auth/register'
authRouter.post('/register', authController.registerController)



// POST - '/api/auth/login
authRouter.post("/login", authController.loginController)


/**
 * @rute GET -> "/api/auth/get-me"
 * @description get the currently logged in user's information
 * @access private
 */

authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports = authRouter