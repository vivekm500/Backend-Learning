const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts", // collection refering to
        required: [true, "postID is required for creating a like"]
    },
    user: {
        type: String,
        requred: [true, "username is required for creating a like"]
    }
},
{
    timestamps: true
})

// compound unique indexing
likeSchema.index({posts: 1, user: 1}, {unique: true})

// model
const likeModel = mongoose.model("likes", likeSchema)


module.exports = likeModel