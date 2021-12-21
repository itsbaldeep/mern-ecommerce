const Inquiry = require("../models/Inquiry");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// POST /api/inquiry/add
exports.addInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    return res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Admin routes
 */

// GET /api/inquiry/
exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find();
    return res.status(200).json({
      success: true,
      inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiry/:id
exports.getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return next(new ErrorResponse("Inquiry not found", 404));
    return res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/inquiry/edit/:id
exports.editInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return next(new ErrorResponse("Inquiry not found", 404));
    if (req.body.name) inquiry.name = req.body.name;
    if (req.body.directory) inquiry.directory = req.body.directory;
    if (req.body.message) inquiry.message = req.body.message;
    if (req.body.email) inquiry.email = req.body.email;
    if (req.body.number) inquiry.number = req.body.number;
    await inquiry.save();
    return res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/inquiry/remove/:id
exports.removeInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return next(new ErrorResponse("Inquiry not found", 404));
    await inquiry.remove();
    return res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Private routes for client
 */

// GET /api/inquiry/own
exports.getOwnInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().where("directory").equals(req.user.directory);
    return res.status(200).json({
      success: true,
      inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiry/own/:id
exports.getOwnInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .where("directory")
      .equals(req.user.directory);
    if (!inquiry) return next(new ErrorResponse("Inquiry not found", 404));
    return res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};
