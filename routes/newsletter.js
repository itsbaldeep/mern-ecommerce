// Libraries
const express = require("express");
const router = express.Router();

// Getting controller functions
const { subscribe, unsubscribe } = require("../controllers/newsletter");

// Auth middleware
const { protect, roles } = require("../middleware/auth");

// Public route
router.route("/subscribe").post(subscribe);
router.route("/unsubscribe").post(unsubscribe);

module.exports = router;
