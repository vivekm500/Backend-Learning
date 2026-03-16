const express = require("express")

const app = express()

app.use(express.json()) // its a middleware --- here it used to read the data sent from frontend

const notes = []

// post method ->  Creates a new resource. The request body contains the data for the new resource. 
app.post('/notes', (req, res) => {

    console.log(req.body) // req (request) is used for getting data from user/client/frontend

    notes.push(req.body)

    res.send("note created") // res (response) is used for sending data from server
})

// get method -> Retrieves a resource or a list of resources. Should not modify data on the server.
app.get('/notes', (req,res) => {
    res.send(notes)
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})



