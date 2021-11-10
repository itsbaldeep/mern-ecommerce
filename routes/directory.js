// Libraries
const express = require("express");
const router = express.Router();

// Directory controller functions
const { getDirectories, getDirectory } = require("../controllers/directory");

// Directory route
router.route("/").get(getDirectories);
router.route("/:username").get(getDirectory);

module.exports = router;
