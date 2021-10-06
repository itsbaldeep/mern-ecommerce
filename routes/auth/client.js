const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const { register, verify, login, forgotPassword, resetPassword } = require("../../controllers/auth/client");

// Routing requests to appropriate controllers
router.route("/register").post(register);
router.route("/verify/:verificationToken").put(verify);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;
