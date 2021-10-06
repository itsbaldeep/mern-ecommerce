const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const {
    getCustomer,
    getCustomerById,
    addCustomer,
    removeCustomer,
    editCustomer,
} = require("../../controllers/panel/customer");
const { protect, isAdmin } = require("../../middleware/auth");

// Routing requests to appropriate controllers
router.route("/").get(protect, isAdmin, getCustomer);
router.route("/:id").get(protect, isAdmin, getCustomerById);
router.route("/add").post(protect, isAdmin, addCustomer);
router.route("/remove/:id").delete(protect, isAdmin, removeCustomer);
router.route("/edit/:id").put(protect, isAdmin, editCustomer);

module.exports = router;
