// Libraries
const express = require("express");
const router = express.Router();

// Getting controller functions
const {
  getCategories,
  getDirectoryCategories,
  getProductCategories,
  getServiceCategories,
  getCategoryById,
  addCategory,
  removeCategory,
  editCategory,
} = require("../controllers/category");

// Auth middleware
const { protect, roles } = require("../middleware/auth");

// Admin routes
router.route("/add").post(protect, roles("Admin"), addCategory);
router.route("/edit/:id").put(protect, roles("Admin"), editCategory);
router.route("/remove/:id").delete(protect, roles("Admin"), removeCategory);

// Public routes
router.route("/").get(getCategories);
router.route("/directory").get(getDirectoryCategories);
router.route("/product").get(getProductCategories);
router.route("/service").get(getServiceCategories);
router.route("/:id").get(getCategoryById);

module.exports = router;
