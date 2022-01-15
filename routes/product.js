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
  reviewProduct,
  removeReview,
  addQuestion,
  removeQuestion,
  addAnswer,
  removeAnswer,
} = require("../controllers/product");

// Middlewares
const { protect, roles } = require("../middleware/auth");
const upload = require("../middleware/multer");
const paginate = require("../middleware/paginate");

// Models
const Product = require("../models/Product");

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

// Review and question routes
router.route("/review/:id").post(protect, reviewProduct);
router.route("/review/remove/:id").delete(protect, removeReview);
router.route("/question/:id").post(protect, addQuestion);
router.route("/question/remove/:id").delete(protect, removeQuestion);
router.route("/answer/:id/:qid").post(protect, addAnswer);
router.route("/answer/remove/:id/:qid").delete(protect, removeAnswer);

// Public routes
router.route("/").get(paginate(Product), getProducts);
router.route("/:id").get(getProductById); // this route must be at the end

module.exports = router;
