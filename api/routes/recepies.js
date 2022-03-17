const config = require("../config");
const { Router } = require("express");

const router = Router();

// Initialize controller.
const recepiesController = require("../controllers/recepiesController");

// Get all recepies.
router.get("/recepies", recepiesController.list);

// Get one recepies
router.get("/recepies/:id", recepiesController.show);

// Get all recepies from logged in user.
router.get("/userRecepies/:id", recepiesController.showUserRecepies);

// Get all recepies from a user.
router.get("/anotherUserRecepies/:id", recepiesController.showAnotherUserRecepies);

// Get all by search.
router.get("/searchRecepies/:id", recepiesController.showSearchRecepies);

// Create recepie.
router.post("/recepies", config.isAuthenticated, recepiesController.create);

// Update recepie.
router.put("/recepies/:id", config.isAuthenticated, recepiesController.update);

// Delete recepie.
router.delete(
  "/recepies/:id",
  config.isAuthenticated,
  recepiesController.delete
);

module.exports = router;
