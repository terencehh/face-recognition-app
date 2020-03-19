// Express.js for server-side routing
const express = require("express");
// bcrypt for hashing passwords
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
app.use(express.json());
// allow cross origin resource sharing
app.use(cors());

// Database of users
// NOTE: Will use bcrypt to hash passwords later once we implement database system via Mongo
const database = {
  users: [
    {
      id: "1",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "2",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com"
    }
  ]
};

// --> Root Route
app.get("/", (req, res) => {
  res.send(database.users);
});

//signin --> POST Request --> Success/Fail
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (
    email === database.users[0].email &&
    password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Error logging in.");
  }
});

//register --> POST Request --> {user}
app.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  // hash the password for security
  database.users.push({
    id: "3",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

//profile/:userId --> GET Request --> {user}
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("No such User");
  }
});

//image --> PUT --> user (with updated count)
app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("No such User");
  }
});

app.listen(3001, () => {
  console.log("Server Successfully Started on Port 3001");
});
