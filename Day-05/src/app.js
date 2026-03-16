// server ko create krna
// server ko config krna

const express = require("express")

const app = express() // server created

app.use(express.json())

const notes = []

// POST '/notes'
app.post("/notes", (req, res)=>{
    console.log(req.body)

    notes.push(req.body)

    res.status(201).json({
        message: "note created successfully"
    })
})


// GET '/notes'
app.get("/notes", (req, res)=>{
    res.status(200).json({
        notes: notes
    })
})


// DELETE '/notes/:index
app.delete("/notes/:index", (req, res)=>{
    delete notes[req.params.index]

    // when we use 204 then no message will be shown ... to see even messages use 200
    res.status(204).json({
        message: "note deleted successfully"
    })
})


// PATCH '/notes/:index'
app.patch("/notes/:index", (req, res)=>{
    notes[req.params.index].description = req.body.description

    res.status(200).json({
        message: "note updated successfully"
    })
})
module.exports = app // server exported 