const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = require("./routes/users");
const recepies = require("./routes/recepies");

app.use(users);
app.use(recepies);

module.exports = {
  path: "/api",
  handler: app,
};
