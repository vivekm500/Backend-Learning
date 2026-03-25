// Here we create the schema(format) to store the data and model to interact with the collection on database

const mongoose = require("mongoose")

// Schema
const noteSchema = new mongoose.Schema({
    title: String,
    description: 'string'
})


// MODEL
const noteModel = new mongoose.model("notes", noteSchema)

module.exports = noteModel