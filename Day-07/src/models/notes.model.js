const mongoose = require("mongoose")

// creating schema of database 
// schema - how we will be storing the data on database
const noteSchema = new mongoose.Schema({
    title: String,
    description: "string"
})

// creating a collection named notes
const noteModel = mongoose.model("notes", noteSchema)

// we store similar kind of data in a collection on database and there can be multiple collections storing similar kinds of data respectively

module.exports = noteModel

