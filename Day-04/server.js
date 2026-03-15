// here we perform starting the server

console.log("SERVER FILE STARTED")

const app = require("./src/app")

app.listen(3000, () => {
    console.log("server is running on port 3000")
})