const express = require("express")

const app = express() //server instasnce create krna

app.get('/', (req, res)=>{
    res.send("Hello world")
})

app.get('/about', (req, res) => {
    res.send("this is about page")
})

app.get('/home', (req, res)=>{
    res.send("you are at home page")
})

app.listen(3000) //server start krna // here 3000 is port no


