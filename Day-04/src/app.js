/*
we mainly do these two task in this js file

--server create krna
-- server ko config krna

*/

console.log("APP FILE STARTED")

const express = require("express")

const app = express() // server create ho jata h

app.use(express.json()) // so that we can resd the data sent from the server

const notes = []

app.get('/', (req,res)=>{

    res.send("Welcome YOU ALL")

})

// POST '/notes'
app.post('/notes', (req, res) => {

    console.log(req.body)
    notes.push(req.body)
    res.send("note created")

    console.log(notes)

})

// GET '/notes'
app.get('/notes', (req ,res) =>{
    res.send(notes)
})

// DELETE '/notes'

// delete '/notes/3'

// use params to get the index
app.delete("/notes/:index", (req, res)=>{

    console.log(req.params.index)

    delete notes[req.params.index]

    res.send("notes deleted successfully")

})

// PATCH '/notes/:index'

// when we want to update just a portion of data not completely the we use  patch method   as here we just want to update the description  and nothing else

// req.body ={description :- "sample modified description"}

app.patch('/notes/:index', (req, res) =>{
    notes[req.params.index].description = req.body.description

    res.send("note updasted successfully")
})

module.exports = app