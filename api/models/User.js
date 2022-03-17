const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User model.
const User = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", User);
