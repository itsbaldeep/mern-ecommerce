const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const {
    getEmployee,
    getEmployeeById,
    addEmployee,
    removeEmployee,
    editEmployee,
} = require("../../controllers/panel/employee");
const { protect, isAdmin } = require("../../middleware/auth");

// Routing requests to appropriate controllers
router.route("/").get(protect, isAdmin, getEmployee);
router.route("/:id").get(protect, isAdmin, getEmployeeById);
router.route("/add").post(protect, isAdmin, addEmployee);
router.route("/remove/:id").delete(protect, isAdmin, removeEmployee);
router.route("/edit/:id").put(protect, isAdmin, editEmployee);

module.exports = router;
