// Libraries
const express = require("express");
const router = express.Router();

// Getting controller functions
const {
  getInquiries,
  getOwnInquiries,
  getInquiryById,
  getOwnInquiryById,
  addInquiry,
  editInquiry,
  removeInquiry,
} = require("../controllers/inquiry");

// Auth middleware
const { protect, roles } = require("../middleware/auth");

// Public route
router.route("/add").post(addInquiry);

// Client route
router.route("/own").get(protect, roles("Client"), getOwnInquiries);
router.route("/own/:id").get(protect, roles("Client"), getOwnInquiryById);

// Admin routes
router.route("/edit/:id").put(protect, roles("Admin"), editInquiry);
router.route("/remove/:id").delete(protect, roles("Admin"), removeInquiry);
router.route("/").get(protect, roles("Admin"), getInquiries);
router.route("/:id").get(protect, roles("Admin"), getInquiryById);

module.exports = router;
