const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const {
  getServices,
  getServiceById,
  getOwnServices,
  getOwnServiceById,
  addService,
  removeService,
  editService,
} = require("../controllers/service");
const { protect, roles } = require("../middleware/auth");

// Admin product controller functions
const { getAllServices, getAnyServiceById, approveService } = require("../controllers/service");

// Multer middleware
const upload = require("../middleware/multer");

// Client routes
router.route("/own").get(protect, roles("Client", "Admin"), getOwnServices);
router.route("/own/:id").get(protect, roles("Client", "Admin"), getOwnServiceById);

// Alteration routes shared by client and admin
router
  .route("/add")
  .post(protect, roles("Client", "Admin"), upload.array("serviceImages", 3), addService);
router.route("/remove/:id").delete(protect, roles("Client", "Admin"), removeService);
router
  .route("/edit/:id")
  .put(protect, roles("Client", "Admin"), upload.array("serviceImages", 3), editService);

// Admin specific routes
router.route("/all").get(protect, roles("Admin"), getAllServices);
router.route("/any/:id").get(protect, roles("Admin"), getAnyServiceById);
router.route("/approve/:id").put(protect, roles("Admin"), approveService);

// Public routes
router.route("/").get(getServices);
router.route("/:id").get(getServiceById); // this route must be at the end

module.exports = router;
