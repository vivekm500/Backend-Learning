// Here configure how we will connect to database

const mongoose = require("mongoose")


// function to connect to DB
async function connectToDb(){
    try{
     await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("connect to DB")
        })
    }
    catch(err){
        console.log("Unable to connect to Database",err.message)
    }
}

module.exports = connectToDb
