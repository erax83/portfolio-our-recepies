const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Recepie model.
const Recepie = new Schema({
  title: { type: String, required: true, index: { unique: true } },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  author_id: { type: String, required: true },
  full_name: { type: String, required: true },
});

module.exports = mongoose.model("Recepie", Recepie);
