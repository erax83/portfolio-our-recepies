const config = require("../config");
const { Router } = require("express");

const router = Router();

// Initialize Controller
const recepiesController = require("../controllers/recepiesController");

// Get All
router.get("/recepies", recepiesController.list);

// Get One
router.get("/recepies/:id", recepiesController.show);

// Get All from one user
router.get("/userRecepies/:id", recepiesController.showUserRecepies);

// Get all by search
router.get("/searchRecepies/:id", recepiesController.showSearchRecepies);

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
