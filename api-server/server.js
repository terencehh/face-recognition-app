const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server Successfully Started on Port 3000");
});

app.get("/", (req, res) => {
  res.send("This is working");
});

/*
hi

/ --> Root Route

/signin --> POST Request --> Success/Fail
/register --> POST Request --> user
/profile/:userId --> GET Request --> user
/image --> PUT --> user (with updated count)


*/
