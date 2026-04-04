const mongoose = require("mongoose")

require("dotenv").config()

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log("unable to connect to database", err.message)
    })
}

module.exports = connectToDb