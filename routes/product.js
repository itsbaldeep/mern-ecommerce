const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const { getProducts, getProductById, addProduct, removeProduct, editProduct } = require("../controllers/product");
const { protect } = require("../middleware/auth");

// Routing requests to appropriate controllers
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/add").post(protect, addProduct);
router.route("/remove/:id").delete(protect, removeProduct);
router.route("/edit/:id").put(protect, editProduct);

module.exports = router;
