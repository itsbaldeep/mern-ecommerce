const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");

// GET /api/product/
exports.getProducts = async (req, res, next) => {
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

// GET /api/product/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
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
    if (req.user.role === "Client") req.body.seller = req.user._id;
    const product = await Product.create(req.body);
    await product.save();
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
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
    // Check if the current user is the seller of that product
    if (req.user && product.seller.toString() != req.user._id.toString()) {
      return next(new ErrorResponse("Unable to remove product", 404));
    }
    // Delete the product
    await product.remove();
    return res.status(200).json({
      success: true,
      message: "Product succesfully removed",
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
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
    // Check if the current user is the seller of that product
    if (req.user && product.seller.toString() != req.user._id.toString()) {
      return next(new ErrorResponse("Unable to remove product", 404));
    }
    // Updating the product
    const result = await Product.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    // Returning the updated product
    const updated = await Product.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product succesfully updated",
      result,
      updated,
    });
  } catch (error) {
    next(error);
  }
};
