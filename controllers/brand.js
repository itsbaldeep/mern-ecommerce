const Brand = require("../models/Brand");
const Directory = require("../models/Directory");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// GET /api/brand/
exports.getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find().populate("products").populate("sellers", "storeName");
    return res.status(200).json({
      success: true,
      brands,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/brand/:id
exports.getBrandById = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id).populate("products");
    if (!brand) return next(new ErrorResponse("Brand not found", 404));
    return res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Admin routes
 */

// POST /api/brand/add
exports.addBrand = async (req, res, next) => {
  try {
    // Validating sellers
    if (req.body.sellers.length > 0)
      for (const seller of req.body.sellers)
        if (!(await Directory.findById(seller)))
          return next(new ErrorResponse(`Cannot find seller with id ${seller}`, 404));

    const brand = await Brand.create({
      name: req.body.name,
      logo: req.body.logo,
      images: req.body.images,
      description: req.body.description,
      sellers: req.body.sellers,
    });
    return res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/brand/edit/:id
exports.editBrand = async (req, res, next) => {
  try {
    // Validating sellers
    if (req.body.sellers.length > 0)
      for (const seller of req.body.sellers)
        if (!(await Directory.findById(seller)))
          return next(new ErrorResponse(`Cannot find seller with id ${seller}`, 404));

    const brand = await Brand.findById(req.params.id);
    if (!brand) return next(new ErrorResponse("Brand not found", 404));
    if (req.body.name) brand.name = req.body.name;
    if (req.body.description) brand.description = req.body.description;
    if (req.body.images) brand.images = req.body.images;
    if (req.body.logo) brand.logo = req.body.logo;
    if (req.body.sellers) brand.sellers = req.body.sellers;
    await brand.save();
    return res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/brand/remove/:id
exports.removeBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return next(new ErrorResponse("Brand not found", 404));
    await brand.remove();
    return res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};
