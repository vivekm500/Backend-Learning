// Here we run the server
// AND connect to Database

// server imported
const app = require("./src/app");

const mongoose = require("mongoose");

// function to connect to Database
// function connectToDb(){
//     mongoose.connect("mongodb+srv://Vivek:BJrZHLRdidkZ86in@cluster0.fgdx5fk.mongodb.net/Day-06")
//     .then(() => {
//         console.log("connected to Database");
//       });
// }

// connectToDb()

// // run  the server
// app.listen(3000, ()=>{
//     console.log("server is running on port 3000")
// })

// First connectin to database then starting the server is preferred as without Database connection your server becomes a lying machine.

// Go with this approach of first connecting to Database then starting the server

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://Vivek:BJrZHLRdidkZ86in@cluster0.fgdx5fk.mongodb.net/Day-06",
    );

    console.log("connected to DB");

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  } catch (err) {
    console.log("DB connection failed:", err.message);
  }
}

startServer()