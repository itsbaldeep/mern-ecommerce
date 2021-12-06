const Pet = require("../models/Pet");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// GET /api/pet/
exports.getPets = async (req, res, next) => {
  try {
    const pets = await Pet.find().populate({ path: "categories", populate: { path: "docs" } });
    return res.status(200).json({
      success: true,
      pets,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/pet/:id
exports.getPetById = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id).populate({
      path: "categories",
      populate: { path: "docs" },
    });
    if (!pet) return next(new ErrorResponse("Pet not found", 404));
    return res.status(200).json({
      success: true,
      pet,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Admin routes
 */

// POST /api/pet/add
exports.addPet = async (req, res, next) => {
  try {
    const pet = await Pet.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      breeds: req.body.breeds,
    });
    return res.status(200).json({
      success: true,
      pet,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/pet/edit/:id
exports.editPet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return next(new ErrorResponse("Pet not found", 404));
    if (req.body.name) pet.name = req.body.name;
    if (req.body.description) pet.description = req.body.description;
    if (req.body.image) pet.image = req.body.image;
    if (req.body.breeds) pet.breeds = req.body.breeds;
    await pet.save();
    return res.status(200).json({
      success: true,
      pet,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/pet/remove/:id
exports.removePet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return next(new ErrorResponse("Pet not found", 404));
    await pet.remove();
    return res.status(200).json({
      success: true,
      pet,
    });
  } catch (error) {
    next(error);
  }
};
