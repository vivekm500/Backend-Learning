// here we write the code to connect to database

require("dotenv").config() // to use variable from .env file

const { default: mongoose } = require("mongoose")



async function connectToDb(){
    try{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to Database")
    })
} catch(err){
    console.log("unable to connect to database:", err.message)
}
}

module.exports = connectToDb