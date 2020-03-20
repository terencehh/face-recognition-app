const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("Incorrect Form Submission");
  }

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
};

module.exports = {
  handleRegister
};
