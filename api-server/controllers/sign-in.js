const handleSignIn = (db, bcrypt) => (req, res) => {
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
};

module.exports = {
  handleSignIn
};
