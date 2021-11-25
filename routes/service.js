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

// Multer middleware
const upload = require("../middleware/multer");

// Routing requests to appropriate controllers
router.route("/").get(getServices);
router.route("/own").get(protect, roles("Client", "Admin"), getOwnServices);
router.route("/own/:id").get(protect, roles("Client", "Admin"), getOwnServiceById);
router
  .route("/add")
  .post(protect, roles("Client", "Admin"), upload.array("serviceImages", 3), addService);
router.route("/remove/:id").delete(protect, roles("Client", "Admin"), removeService);
router
  .route("/edit/:id")
  .put(protect, roles("Client", "Admin"), upload.array("serviceImages", 3), editService);
router.route("/:id").get(getServiceById);

module.exports = router;
