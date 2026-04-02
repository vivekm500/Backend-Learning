const express = require("express")

const authRouter = require("./routes/auth.routes")

const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json()) // middleware to resd json data

app.use(cookieParser()) // middleware to store data in cookies-storage

app.use('/api/auth', authRouter)

module.exports = app