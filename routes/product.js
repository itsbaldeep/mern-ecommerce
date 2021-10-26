const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const {
  getProducts,
  getProductById,
  addProduct,
  removeProduct,
  editProduct,
} = require("../controllers/product");
const { protect, roles } = require("../middleware/auth");

// Routing requests to appropriate controllers
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/add").post(protect, roles("Client", "Admin"), addProduct);
router.route("/remove/:id").delete(protect, roles("Client", "Admin"), removeProduct);
router.route("/edit/:id").put(protect, roles("Client", "Admin"), editProduct);

module.exports = router;
