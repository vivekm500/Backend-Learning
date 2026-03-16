// server ko start krna

const app = require("./src/app"); //importes app from ./src/app

// starting the server
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
