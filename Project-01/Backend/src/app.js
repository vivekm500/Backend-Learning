const express = require("express")

const cookieParser = require("cookie-parser")

const cors = require("cors") // for cors problem while communicating with frontend


const app = express();

app.use(express.json())

app.use(cookieParser())  // used as middleware

// used as middleware to communicate with frontend
app.use(
  cors({
    credentials: true,  // to store token in cookie in browser
    origin: "http://localhost:5173" 
  })); 

// require routes
const authRouter = require("./routes/auth.routes");

const postRouter = require("./routes/post.routes");

const userRouter = require("./routes/user.routes")

// using routes
app.use("/api/auth", authRouter)

app.use("/api/posts", postRouter)

app.use("/api/users", userRouter)




module.exports = app