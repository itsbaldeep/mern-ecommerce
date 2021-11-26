// Libraries
const express = require("express");
const router = express.Router();

// Directory controller functions
const { getDirectories, getDirectory } = require("../controllers/directory");

// Admin directory controller functions
const {
  getAllDirectories,
  getAnyDirectoryById,
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

// Public routes
router.route("/").get(getDirectories);
router.route("/:username").get(getDirectory); // this route must be at the end

module.exports = router;
