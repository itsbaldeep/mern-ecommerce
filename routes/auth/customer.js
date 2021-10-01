const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const { register, login, forgotPassword, resetPassword } = require("../../controllers/auth/customer");

// Routing requests to appropriate controllers
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;
