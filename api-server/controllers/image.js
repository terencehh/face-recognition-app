const handleImagePut = db => (req, res) => {
  const { id } = req.body;

  db("user")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImagePut
};
