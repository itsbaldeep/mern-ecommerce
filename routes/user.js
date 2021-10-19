// Libraries
const express = require("express");
const router = express.Router();

// Authentication controller functions
const {
  register,
  verify,
  login,
  forgotPassword,
  resetPassword,
  getDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/user");

// Admin controller functions
const { getUsers, getUserById, addUser, editUser, deleteUser } = require("../controllers/user");

// Access control middleware
const { protect, roles } = require("../middleware/auth");

// Authentication routes
router.route("/register").post(register);
router.route("/verify/:verificationToken").get(verify);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

// Private routes
router.route("/me").get(protect, getDetails);
router.route("/updatepassword").put(protect, updatePassword);
router.route("/updateprofile").put(protect, updateProfile);

// Admin routes
router.route("/").get(protect, roles("Admin"), getUsers);
router.route("/:id").get(protect, roles("Admin"), getUserById);
router.route("/add").post(protect, roles("Admin"), addUser);
router.route("/edit/:id").put(protect, roles("Admin"), editUser);
router.route("/delete/:id").delete(protect, roles("Admin"), deleteUser);

module.exports = router;
