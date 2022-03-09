const config = require("../config");
const { Router } = require("express");

const router = Router();

// Initialize Controller
const favouritesController = require("../controllers/favouritesController");

// Create
router.post("/favourites", config.isAuthenticated, favouritesController.create);

module.exports = router;
