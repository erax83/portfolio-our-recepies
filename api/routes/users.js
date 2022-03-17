const config = require("../config");
const { Router } = require("express");

const router = Router();

// Initialize controller.
const usersController = require("../controllers/usersController");

// Register user.
router.post("/users/register", usersController.register);

// Login user.
router.post("/users/login", usersController.login);

// Get user.
router.get("/users/user", usersController.user);

module.exports = router;
