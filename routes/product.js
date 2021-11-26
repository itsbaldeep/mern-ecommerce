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
  getAllProducts,
  getAnyProductById,
  approveProduct,
} = require("../controllers/product");
const { protect, roles } = require("../middleware/auth");

// Multer middleware
const upload = require("../middleware/multer");

// Client routes
router.route("/own").get(protect, roles("Client"), getOwnProducts);
router.route("/own/:id").get(protect, roles("Client"), getOwnProductById);

// Admin routes
router.route("/all").get(protect, roles("Admin"), getAllProducts);
router.route("/any/:id").get(protect, roles("Admin"), getAnyProductById);
router.route("/approve/:id").put(protect, roles("Admin"), approveProduct);

// Alternation routes shared by both admin and client
router
  .route("/add")
  .post(protect, roles("Client", "Admin"), upload.array("productImages", 7), addProduct);
router.route("/remove/:id").delete(protect, roles("Client", "Admin"), removeProduct);
router
  .route("/edit/:id")
  .put(protect, roles("Client", "Admin"), upload.array("productImages", 7), editProduct);

// Public routes
router.route("/").get(getProducts);
router.route("/:id").get(getProductById); // this route must be at the end

module.exports = router;
