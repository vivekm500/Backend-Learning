// Here we create and config the server

// imported express
const express = require("express")
const noteModel = require("./models/notes.model")



// server created
const app  = express()

app.use(express.json()) // middleware to read and manipulate data in json format

/*
POST /notes
req.body => {title,description}
 */
app.post("/notes", async (req, res)=>{
    const {title, description} = req.body

    // creating note on database
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})


/**
 * GET /notes
 * -- fetch all notes data
 */
app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})

module.exports = app