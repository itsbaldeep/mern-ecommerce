const express = require("express");
const router = express.Router();

// Getting controller functions for every route
const {
  getProducts,
  getProductById,
  getOwnProducts,
  getOwnProductById,
  addProduct,
  removeProduct,
  editProduct,
} = require("../controllers/product");
const { protect, roles } = require("../middleware/auth");

// Multer middleware
const upload = require("../middleware/multer");

// Routing requests to appropriate controllers
router.route("/").get(getProducts);
router.route("/own").get(protect, roles("Client", "Admin"), getOwnProducts);
router.route("/own/:id").get(protect, roles("Client", "Admin"), getOwnProductById);
router
  .route("/add")
  .post(protect, roles("Client", "Admin"), upload.array("productImages", 7), addProduct);
router.route("/remove/:id").delete(protect, roles("Client", "Admin"), removeProduct);
router
  .route("/edit/:id")
  .put(protect, roles("Client", "Admin"), upload.array("productImages", 7), editProduct);
router.route("/:id").get(getProductById);

module.exports = router;
