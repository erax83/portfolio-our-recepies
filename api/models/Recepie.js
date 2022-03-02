const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recepie = new Schema({
  title: { type: String, required: true, index: { unique: true } },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  authorId: { type: String }
});

module.exports = mongoose.model("Recepie", Recepie);
