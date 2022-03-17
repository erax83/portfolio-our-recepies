const express = require("express");
const db = require("./db");

// Express instance.
const app = express();

// Initialize body parser options.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes.
const users = require("./routes/users");
const recepies = require("./routes/recepies");

app.use(users);
app.use(recepies);

// Export server middleware.
module.exports = {
  path: "/api",
  handler: app,
};
