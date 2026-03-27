// Here we create the server

const express = require("express")

const noteModel = require("./models/note.model.js");

const cors = require("cors")

const app = express()

const path =require("path")

app.use(express.json()) // middleware to read json data

app.use(express.static("./public"))  // middleware to make all from folder publically available

app.use(cors()) // to accept cross origin request // here from frontend because frontend is running on different port



/*
  POST - '/api/notes'
  - create new note and save data in mongodb
  - req.body = {title,description}
*/
app.post('/api/notes', async (req,res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})


/**
 * GET  - '/api/notes'
 * - fetch all the created notes data from mongodb and send them in the response
 */
app.get('/api/notes', async (req,res)=>{
    const NotesData = await noteModel.find()

    res.status(200).json({
        message: "notes fetched successfully",
        NotesData
    })
})


/**
 * DELETE - '/api/notes:id'
 * - Delete note with the id from req.params
 */
app.delete('/api/notes/:id', async (req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)  // "findByIdAndDelete" will find data with that id and will delete from database

    res.status(200).json({
        message: "Note Deleted successfully"
    })
})


/**
 * PATCH - '/api/notes:id'
 * - update the description of the note
 * - req.body = {description}
 */
app.patch('/api/notes/:id', async (req,res)=>{
    const id = req.params.id

    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully"
    })
})


// handling wildcard api
app.use('*name', (req,res)=>{
    // res.send("this is wildcard")

    res.sendFile(path.join(__dirname, "..", "./public/index.html"));
})

module.exports = app