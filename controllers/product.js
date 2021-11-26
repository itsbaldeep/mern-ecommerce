const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// GET /api/product/
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isApproved: true });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/product/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).where("isApproved").equals(true);
    if (!product) return next(new ErrorResponse("Product not found", 404));
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Private routes for client
 */

// GET /api/product/own
exports.getOwnProducts = async (req, res, next) => {
  try {
    const products = await Product.find().where("seller").equals(req.user.id);
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/product/own/:id
exports.getOwnProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).where("seller").equals(req.user.id);
    if (!product) return next(new ErrorResponse("Product not found", 404));
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/product/add
exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      seller: req.user.role === "Client" ? req.user._id : null,
      name: req.body?.name,
      category: req.body?.category,
      petType: req.body?.petType.split(","),
      breedType: req.body?.breedType,
      description: req.body?.description,
      weight: req.body?.weight,
      size: JSON.parse(req.body?.size),
      countInStock: req.body?.countInStock,
      price: req.body?.price,
      isVeg: req.body?.isVeg,
      ageRange: JSON.parse(req.body?.ageRange),
    });
    if (req.files) {
      const newImages = req.files.map((image) => `/uploads/${image.filename}`);
      product.productImages = product.productImages.concat(newImages);
      await product.save();
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/product/remove/:id
exports.removeProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    // Check if the product exists
    if (!product) return next(new ErrorResponse("Product not found", 404));

    // Check if the current user is the seller of that product or an admin
    if (req.user.role !== "Admin" && product.seller.toString() != req.user._id.toString())
      return next(new ErrorResponse("Unable to remove product", 404));

    // Delete the product
    await product.remove();
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/product/edit/:id
exports.editProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    // Check if the product exists
    if (!product) return next(new ErrorResponse("Product not found", 404));

    // Check if the current user is the seller of that product
    if (req.user && product.seller.toString() != req.user._id.toString())
      return next(new ErrorResponse("Unable to remove product", 404));

    // Updating the product
    if (req.body.name) product.name = req.body.name;
    if (req.body.category) product.category = req.body.category;
    if (req.body.petType) product.petType = req.body.petType.split(",");
    if (req.body.breedType) product.breedType = req.body.breedType;
    if (req.body.description) product.description = req.body.description;
    if (req.body.weight) product.weight = req.body.weight;
    if (req.body.size) product.size = JSON.parse(req.body.size);
    if (req.body.countInStock) product.countInStock = req.body.countInStock;
    if (req.body.price) product.price = req.body.price;
    if (req.body.isVeg) product.isVeg = req.body.isVeg;
    if (req.body.ageRange) product.ageRange = JSON.parse(req.body.ageRange);
    if (req.files) {
      const newImages = req.files.map((image) => `/uploads/${image.filename}`);
      product.productImages = product.productImages.concat(newImages);
    }
    if (req.body.productImages) product.productImages = req.body.productImages.split(",");
    if (req.body.productImages === "") product.productImages = [];
    await product.save();

    // Returning the updated product
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Admin routes
 */

// GET /api/product/all
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/product/any/:id
exports.getAnyProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorResponse("Product not found", 404));

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/product/approve/:id
exports.approveProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorResponse("Product not found", 404));

    product.isApproved = true;
    product.approvedAt = Date.now();
    await product.save();
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
