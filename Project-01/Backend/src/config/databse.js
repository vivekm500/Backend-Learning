const mongoose = require("mongoose")
require("dotenv").config()

async function connectToDb(){
await mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log("can't connect to Database",err)
})
}

module.exports = connectToDb