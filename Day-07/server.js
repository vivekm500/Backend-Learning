// Here we run the server and connect to Database

// importing created server from app.js
const { default: mongoose } = require("mongoose")
const app = require("./src/app")
const connectToDb = require("./src/config/database")


// connecting to database
connectToDb()

// running the server
app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
