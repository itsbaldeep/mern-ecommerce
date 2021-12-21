// Libraries
const express = require("express");
const router = express.Router();

// Directory controller functions
const {
  getAllDirectories,
  getAnyDirectoryById,
  getDirectories,
  getDirectory,
  getDirectoryProducts,
  getDirectoryServices,
  reviewDirectory,
  removeReview,
  addDirectory,
  editDirectory,
  approveDirectory,
  removeDirectory,
} = require("../controllers/directory");

// Auth middleware
const { protect, roles } = require("../middleware/auth");

// Multer middleware
const upload = require("../middleware/multer");

// Admin routes
router.route("/all").get(protect, roles("Admin"), getAllDirectories);
router.route("/any/:id").get(protect, roles("Admin"), getAnyDirectoryById);
router.route("/add").post(protect, roles("Admin"), addDirectory);
router
  .route("/edit/:id")
  .put(protect, roles("Admin"), upload.array("directoryImages", 5), editDirectory);
router.route("/approve/:id").put(protect, roles("Admin"), approveDirectory);
router.route("/remove/:id").delete(protect, roles("Admin"), removeDirectory);

// Review routes
router.route("/review/:username").post(protect, reviewDirectory);
router.route("/review/remove/:username").delete(protect, removeReview);

// Public routes
router.route("/products/:username").get(getDirectoryProducts);
router.route("/services/:username").get(getDirectoryServices);
router.route("/").get(getDirectories);
router.route("/:username").get(getDirectory); // this route must be at the end

module.exports = router;
