const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const {
  getServices,
  getServiceById,
  addService,
  removeService,
  editService,
} = require("../controllers/service");
const { protect } = require("../middleware/auth");

// Routing requests to appropriate controllers
router.route("/").get(getServices);
router.route("/add").post(protect, addService);
router.route("/remove/:id").delete(protect, removeService);
router.route("/edit/:id").put(protect, editService);
router.route("/:id").get(getServiceById);

module.exports = router;
