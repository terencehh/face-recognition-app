const clarifai = require("clarifai");

const app = new clarifai.App({
  apiKey: "5dc4f1f03f2740fbaffdbb786de801d4"
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to Work with API."));
};

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
  handleImagePut,
  handleApiCall
};
