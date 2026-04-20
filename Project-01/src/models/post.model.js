const mongoose  = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [ true, "imgUrl is required for creating a post"]
    },
    // taking userId from users collection alrerady created
    user:{
        ref:"users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required for creating a post"]
    }
})



const postModel = mongoose.model("post", postSchema)

module.exports = postModel