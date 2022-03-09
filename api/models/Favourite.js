const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Favourite = new Schema({
  author_id: { type: String },
  titles: { type: Array },
  authors: { type: Array },
});

module.exports = mongoose.model("Favourite", Favourite);
