// Libraries
const express = require("express");
const router = express.Router();

// Getting controller functions
const { getPets, getPetById, addPet, removePet, editPet } = require("../controllers/pet");

// Auth middleware
const { protect, roles } = require("../middleware/auth");

// Admin routes
router.route("/add").post(protect, roles("Admin"), addPet);
router.route("/edit/:id").put(protect, roles("Admin"), editPet);
router.route("/remove/:id").delete(protect, roles("Admin"), removePet);

// Public routes
router.route("/").get(getPets);
router.route("/:id").get(getPetById);

module.exports = router;
