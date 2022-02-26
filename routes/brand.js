// Libraries
const express = require("express");
const router = express.Router();

// Getting controller functions
const {
  getBrands,
  getBrandById,
  addBrand,
  removeBrand,
  editBrand,
} = require("../controllers/brand");

// Auth middleware
const { protect, roles } = require("../middleware/auth");

// Admin routes
router.route("/add").post(protect, roles("Admin", "Product Admin"), addBrand);
router.route("/edit/:id").put(protect, roles("Admin", "Product Admin"), editBrand);
router.route("/remove/:id").delete(protect, roles("Admin", "Product Admin"), removeBrand);

// Public routes
router.route("/").get(getBrands);
router.route("/:id").get(getBrandById);

module.exports = router;
