const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const { login } = require("../../controllers/auth/employee");

// Routing requests to appropriate controllers
router.route("/login").post(login);

module.exports = router;
