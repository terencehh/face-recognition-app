// Express.js for server-side routing
const express = require("express");
// bcrypt for hashing passwords
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "ngter",
    password: "021358",
    database: "facerecognitionapp"
  }
});

const app = express();
app.use(express.json());
// allow cross origin resource sharing
app.use(cors());

// --> Root Route
app.get("/", (req, res) => {
  res.send(database.users);
});

//signin --> POST Request --> Success/Fail
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // check email & password against database
  db.select("email", "hash")
    .from("login")
    // first check email
    .where("email", "=", email)
    .then(userData => {
      // check the password against its hashed value
      const isValid = bcrypt.compareSync(password, userData[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("user")
          .where("email", "=", email)
          .then(user => res.json(user[0]))
          .catch(err =>
            res
              .status(400)
              .json(
                "User Exists but currently unable to get user. Please try another time."
              )
          );
      } else {
        // Email exists but password is wrong
        res.status(400).json("Wrong Credentials");
      }
    })
    // Email entered does not Exist
    .catch(err => res.status(400).json("Wrong Credentials."));
});

//register --> POST Request --> {user}
app.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  // hash the password for security
  const hash = bcrypt.hashSync(password);

  // transaction of inserting record to both login & email tables
  db.transaction(trx => {
    trx
      .insert({
        hash,
        email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("user")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err =>
    res.status(400).json("Unable to Register. Email already exists.")
  );
});

//profile/:userId --> GET Request --> {user}
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("user")
    .where({ id })
    .then(user => {
      user.length
        ? res.json(user[0])
        : res.status(400).json("Error Getting User");
    });
});

//image --> PUT --> user (with updated count)
app.put("/image", (req, res) => {
  const { id } = req.body;

  db("user")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to get entries"));
});

app.listen(3001, () => {
  console.log("Server Successfully Started on Port 3001");
});
