const config = require("../config");
const { Router } = require("express");

const router = Router();

// Initialize Controller
const recepiesController = require("../controllers/recepiesController");

// Get All
router.get("/recepies", recepiesController.list);

// Get One
router.get("/recepies/:id", recepiesController.show);

// Create
router.post("/recepies", config.isAuthenticated, recepiesController.create);

// Update
router.put("/recepies/:id", config.isAuthenticated, recepiesController.update);

// Delete
router.delete(
  "/recepies/:id",
  config.isAuthenticated,
  recepiesController.delete
);

module.exports = router;
