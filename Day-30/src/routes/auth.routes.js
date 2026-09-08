import { Router } from "express";

import { registerUser } from "../controllers/auth.controller.js";

const authRouter = Router()

/**
 * @route post -> "api/auth/register"
 */
authRouter.post('/register', registerUser)


export default authRouter