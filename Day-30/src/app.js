import express from "express"

import authRouter from "./routes/auth.routes.js"

import handdleError from "./middleware/error.middleware.js"

import dotenv from 'dotenv'

dotenv.config() // there is a problem dotenv that in whichever file  .config() is called , we can use environmental variable in that  file only

const app = express()

app.use("/api/auth", authRouter)

// handleError middleware will be used at last
app.use(handdleError)

export default app