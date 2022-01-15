const Product = require("../models/Product");
const Category = require("../models/Category");
const Pet = require("../models/Pet");
const Brand = require("../models/Brand");
const Directory = require("../models/Directory");
const Review = require("../models/Review");
const Question = require("../models/Question");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// GET /api/product/search?category=C&pet=P&brand=B&limit=L&page=P
exports.search = async (req, res, next) => {
  try {
    const category = req.query.category;
    const pet = req.query.pet;
    const brand = req.query.brand;

    const products = [];
    if (category) products.push(await Category.find({ name: category }));
    // TODO: Complete this
  } catch (error) {
    next(error);
  }
};

// GET /api/product?limit=L&page=P
exports.getProducts = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      products: res.paginated,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/product/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .where("isApproved")
      .equals(true)
      .populate({
        path: "reviews",
        populate: { path: "reviewer" },
      });
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
 * Review route - user is authenticated
 */

// POST /api/product/review/:id
exports.reviewProduct = async (req, res, next) => {
  try {
    // Checking if the product exists
    const product = await Product.findById(req.params.id).where("isApproved").equals(true);
    if (!product)
      return next(new ErrorResponse("Cannot find the product or it isn't approved", 404));

    // Checking if the user has already reviewed the product
    const reviewer = req.user._id;
    const revieweeModel = "Product";
    const revieweeId = product._id;
    if (await Review.findOne({ reviewer, revieweeId }))
      return next(
        new ErrorResponse(
          `User (${req.user.name}) has already reviewed the product (${product.name})`,
          400
        )
      );

    // Creating the review and sending it
    const review = await Review.create({
      reviewer,
      revieweeModel,
      revieweeId,
      subject: req.body.subject,
      comment: req.body.comment,
      rating: req.body.rating,
    });
    await review.populate("reviewer");
    return res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/product/review/remove/:id
exports.removeReview = async (req, res, next) => {
  try {
    // Checking if the product exists
    const product = await Product.findById(req.params.id).where("isApproved").equals(true);
    if (!product)
      return next(new ErrorResponse("Cannot find the product or it isn't approved", 404));

    // Checking if the user has reviewed
    const reviewer = req.user._id;
    const revieweeId = product._id;
    const review = await Review.findOne({ reviewer, revieweeId });
    if (!review)
      return next(
        new ErrorResponse(
          `User (${req.user.name}) has not reviewed the product (${product.name})`,
          400
        )
      );

    // Removing the review and returning it
    await review.remove();
    return res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/product/question/:id
exports.addQuestion = async (req, res, next) => {
  try {
    // Checking if the product exists
    const product = await Product.findById(req.params.id).where("isApproved").equals(true);
    if (!product)
      return next(new ErrorResponse("Cannot find the product or it isn't approved", 404));

    // Checking if the user already posed a question on product
    const askedBy = req.user._id;
    if (await Question.findOne({ askedBy, product: product._id }))
      return next(
        new ErrorResponse(
          `User (${req.user.name}) has already questioned the product (${product.name})`,
          400
        )
      );

    // Creating a question and sending it back
    const question = await Question.create({
      askedBy,
      product: product._id,
      question: req.body.question,
    });
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/product/question/remove/:id
exports.removeQuestion = async (req, res, next) => {
  try {
    // Checking if the product exists
    const product = await Product.findById(req.params.id).where("isApproved").equals(true);
    if (!product)
      return next(new ErrorResponse("Cannot find the product or it isn't approved", 404));

    // Checking if the user already posed a question on product
    const askedBy = req.user._id;
    const question = await Question.findOne({ askedBy, product: product._id });
    if (!question)
      return next(
        new ErrorResponse(
          `User (${req.user.name}) has not questioned the product (${product.name})`,
          400
        )
      );

    // Removing the question and returning it
    await question.remove();
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/product/answer/:id/:qid
exports.addAnswer = async (req, res, next) => {
  try {
    // Checking if the product exists
    const product = await Product.findById(req.params.id).where("isApproved").equals(true);
    if (!product)
      return next(new ErrorResponse("Cannot find the product or it isn't approved", 404));

    // Checking if the question exists
    const question = await Question.findById(req.params.qid);
    if (!question) return next(new ErrorResponse("Cannot find the question on this product", 404));

    // Checking if the user already posted an answer on product
    for (const answer of question.answers)
      if (answer.answeredBy.toString() === req.user._id.toString())
        return next(
          new ErrorResponse(
            `User (${req.user.name}) has already answered the question (${question.question})`,
            400
          )
        );

    // Adding the answer and sending back the question
    question.answers.push({ answer: req.body.answer, answeredBy: req.user._id });
    await question.save();
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/product/answer/remove/:id/:qid
exports.removeAnswer = async (req, res, next) => {
  try {
    // Checking if the product exists
    const product = await Product.findById(req.params.id).where("isApproved").equals(true);
    if (!product)
      return next(new ErrorResponse("Cannot find the product or it isn't approved", 404));

    // Checking if the question exists
    const question = await Question.findById(req.params.qid);
    if (!question) return next(new ErrorResponse("Cannot find the question on this product", 404));

    // Checking if the user already posted an answer on product
    const index = question.answers.findIndex(
      (answer) => answer.answeredBy.toString() === req.user._id.toString()
    );
    if (index === -1)
      return next(
        new ErrorResponse(
          `User ${req.user.name} has not answered the question ${question.name}`,
          404
        )
      );

    // Removing the answer and returning it
    question.answers.slice(index, 1);
    await question.save();
    return res.status(200).json({
      success: true,
      question,
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
    const products = await Product.find().where("seller").equals(req.user.directory);
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
    const product = await Product.findById(req.params.id)
      .where("seller")
      .equals(req.user.directory);
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
      seller: req.user.role === "Client" ? req.user.directory : null,
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      petType: req.body.petType?.split(","),
      keywords: req.body.keywords?.split(","),
      breedType: req.body.breedType,
      description: req.body.description,
      weight: req.body.weight,
      size: JSON.parse(req.body.size || "{}"),
      countInStock: req.body.countInStock,
      price: req.body.price,
      isVeg: req.body.isVeg,
      ageRange: JSON.parse(req.body.ageRange || "{}"),
      affiliateLinks: JSON.parse(req.body.affiliateLinks || "{}"),
      productImages: req.body.productImages?.split(","),
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

    // Check if the current user is editing a non-seller product
    if (req.user.role !== "Admin" && !product.seller)
      return next(new ErrorResponse("Unable to remove product", 403));

    // Check if the current user is the seller of that product or an admin
    if (req.user.role !== "Admin" && product.seller.toString() != req.user._id.toString())
      return next(new ErrorResponse("Unable to remove product", 403));

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

    // Check if the current user is editing a non-seller product
    if (req.user.role !== "Admin" && !product.seller)
      return next(new ErrorResponse("Unable to edit product", 401));

    // Check if the current user is the seller of that product or an admin
    if (req.user.role !== "Admin" && product.seller.toString() !== req.user._id.toString())
      return next(new ErrorResponse("Unable to edit product", 401));

    // Check if the seller ref is passed
    if (req.user.role === "Admin" && req.body.seller !== undefined) {
      // To remove the seller ref
      if (req.body.seller === "") product.seller = null;
      // To add or update the seller ref
      else {
        if (!(await Directory.findById(req.body.seller)))
          return next(new ErrorResponse("Cannot find the directory", 404));
        product.seller = req.body.seller;
      }
    }

    // Updating the product
    if (req.body.name) product.name = req.body.name;
    if (req.body.brand) product.brand = req.body.brand;
    if (req.body.category) product.category = req.body.category;
    if (req.body.petType) product.petType = req.body.petType.split(",");
    if (req.body.keywords) product.keywords = req.body.keywords.split(",");
    if (req.body.breedType) product.breedType = req.body.breedType;
    if (req.body.description) product.description = req.body.description;
    if (req.body.weight) product.weight = req.body.weight;
    if (req.body.size) product.size = JSON.parse(req.body.size);
    if (req.body.countInStock) product.countInStock = req.body.countInStock;
    if (req.body.price) product.price = req.body.price;
    if (req.body.isVeg) product.isVeg = req.body.isVeg;
    if (req.body.ageRange) product.ageRange = JSON.parse(req.body.ageRange);
    if (req.body.affiliateLinks) product.affiliateLinks = JSON.parse(req.body.affiliateLinks);
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
