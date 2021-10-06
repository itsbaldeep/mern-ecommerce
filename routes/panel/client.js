const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const { getClient, getClientById, addClient, removeClient, editClient } = require("../../controllers/panel/client");
const { protect, isAdmin } = require("../../middleware/auth");

// Routing requests to appropriate controllers
router.route("/").get(protect, isAdmin, getClient);
router.route("/:id").get(protect, isAdmin, getClientById);
router.route("/add").post(protect, isAdmin, addClient);
router.route("/remove/:id").delete(protect, isAdmin, removeClient);
router.route("/edit/:id").put(protect, isAdmin, editClient);

module.exports = router;
