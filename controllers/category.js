const Category = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// GET /api/category/
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("docs");
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/category/:id
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate("docs");
    if (!category) return next(new ErrorResponse("Category not found", 404));
    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/category/directory/
exports.getDirectoryCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().where("type").equals("Directory").populate("docs");
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/category/product/
exports.getProductCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().where("type").equals("Product").populate("docs");
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/category/service/
exports.getServiceCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().where("type").equals("Service").populate("docs");
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Admin routes
 */

// POST /api/category/add
exports.addCategory = async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      type: req.body.type,
      pet: req.body.pet,
      image: req.body.image,
      description: req.body.description,
    });
    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/category/edit/:id
exports.editCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new ErrorResponse("Category not found", 404));
    if (req.body.name) category.name = req.body.name;
    if (req.body.description) category.description = req.body.description;
    if (req.body.image) category.image = req.body.image;
    if (req.body.pet) category.pet = req.body.pet;
    if (req.body.type) category.type = req.body.type;
    await category.save();
    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/category/remove/:id
exports.removeCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new ErrorResponse("Category not found", 404));
    await category.remove();
    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};