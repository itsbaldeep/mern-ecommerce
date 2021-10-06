const express = require("express");
const router = express.Router();

// Getting login controller
const { login } = require("../../controllers/auth/admin");

// Login route
router.route("/login").post(login);

module.exports = router;
