const Service = require("../models/Service");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// GET /api/service/
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isApproved: true });
    return res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/service/:id
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).where("isApproved").equals(true);
    if (!service) return next(new ErrorResponse("Service not found", 404));
    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Private routes for client
 */

// GET /api/service/own
exports.getOwnServices = async (req, res, next) => {
  try {
    const services = await Service.find().where("seller").equals(req.user.id);
    return res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/service/own/:id
exports.getOwnServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).where("seller").equals(req.user.id);
    if (!service) return next(new ErrorResponse("Service not found", 404));
    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/service/add
exports.addService = async (req, res, next) => {
  try {
    const service = await Service.create({
      seller: req.user.role === "Client" ? req.user.directory : null,
      name: req.body.name,
      address: req.body.address,
      nameOfIncharge: req.body.nameOfIncharge,
      numberOfIncharge: req.body.numberOfIncharge,
      timings: JSON.parse(req.body.timings || "{}"),
      days: req.body.days,
      category: req.body.category,
      petType: req.body.petType?.split(","),
      breedType: req.body.breedType,
      description: req.body.description,
      price: req.body.price,
      ageRange: JSON.parse(req.body.ageRange || "{}"),
    });
    if (req.files) {
      const newImages = req.files.map((image) => `/uploads/${image.filename}`);
      service.serviceImages = service.serviceImages.concat(newImages);
      await service.save();
    }
    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/service/remove/:id
exports.removeService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    // Check if the service exists
    if (!service) return next(new ErrorResponse("Service not found", 404));

    // Check if the current user is editing a non-seller service
    if (req.user.role !== "Admin" && !service.seller)
      return next(new ErrorResponse("Unable to remove service", 403));

    // Check if the current user is the seller of that service or an admin
    if (req.user.role !== "Admin" && service.seller.toString() != req.user._id.toString())
      return next(new ErrorResponse("Unable to remove service", 403));

    // Delete the service
    await service.remove();
    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/service/edit/:id
exports.editService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    // Check if the service exists
    if (!service) return next(new ErrorResponse("Service not found", 404));

    // Check if the current user is editing a non-seller service
    if (req.user.role !== "Admin" && !service.seller)
      return next(new ErrorResponse("Unable to remove service", 403));

    // Check if the current user is the seller of that service or an admin
    if (req.user.role !== "Admin" && service.seller.toString() != req.user._id.toString())
      return next(new ErrorResponse("Unable to remove service", 403));

    // Updating the service
    if (req.body.name) service.name = req.body.name;
    if (req.body.address) service.address = req.body.address;
    if (req.body.nameOfIncharge) service.nameOfIncharge = req.body.nameOfIncharge;
    if (req.body.numberOfIncharge) service.numberOfIncharge = req.body.numberOfIncharge;
    if (req.body.timings) service.timings = JSON.parse(req.body.timings);
    if (req.body.days) service.days = req.body.days;
    if (req.body.category) service.category = req.body.category;
    if (req.body.petType) service.petType = req.body.petType.split(",");
    if (req.body.breedType) service.breedType = req.body.breedType;
    if (req.body.description) service.description = req.body.description;
    if (req.body.price) service.price = req.body.price;
    if (req.body.ageRange) service.ageRange = JSON.parse(req.body.ageRange);
    if (req.files) {
      const newImages = req.files.map((image) => `/uploads/${image.filename}`);
      service.serviceImages = service.serviceImages.concat(newImages);
    }
    if (req.body.serviceImages) service.serviceImages = req.body.serviceImages.split(",");
    if (req.body.serviceImages === "") service.serviceImages = [];
    await service.save();

    // Returning the updated service
    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Admin routes
 */

// GET /api/service/all
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    return res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/service/any/:id
exports.getAnyServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return next(new ErrorResponse("Service not found", 404));

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/service/approve/:id
exports.approveService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return next(new ErrorResponse("Service not found", 404));

    service.isApproved = true;
    service.approvedAt = Date.now();
    await service.save();
    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};
