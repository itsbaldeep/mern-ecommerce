// Models
const Directory = require("../models/Directory");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// GET /api/directory
exports.getDirectories = async (req, res, next) => {
  const directories = await Directory.find({ isApproved: true });
  return res.status(200).json({
    success: true,
    directories,
  });
};

// GET /api/directory/:username
exports.getDirectory = async (req, res, next) => {
  const directory = await Directory.findOne({
    isApproved: true,
    username: req.params.username,
  });
  if (!directory) return next(new ErrorResponse("Directory not found", 404));

  return res.status(200).json({
    success: true,
    directory,
  });
};

/*
 * Admin controllers
 */

// GET /api/directory/all
exports.getAllDirectories = async (req, res, next) => {
  try {
    const directories = await Directory.find().select("+user").populate("user");
    return res.status(200).json({
      success: true,
      directories,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/directory/any/:id
exports.getAnyDirectoryById = async (req, res, next) => {
  try {
    const directory = await Directory.findById(req.params.id).select("+user").populate("user");
    if (!directory) return next(new ErrorResponse("Directory not found", 404));

    return res.status(200).json({
      success: true,
      directory,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/directory/add
exports.addDirectory = async (req, res, next) => {
  try {
    // Checking if the directory is being linked to an existing user
    let user, link;
    if (req.body.user !== "") {
      user = await User.findById(req.body.user);
      if (!user) return next(new ErrorResponse("User not found", 404));
      if (user.directory)
        return next(new ErrorResponse("This user already has a directory profile", 404));
      link = true;
    }

    // Creating the directory
    const directory = await Directory.create({
      storeName: req.body?.storeName,
      email: req.body?.email,
      address: req.body?.address,
      category: req.body?.category,
      state: req.body?.state,
      city: req.body?.city,
      pincode: req.body?.pincode,
      number: req.body?.number,
    });

    // Adding refs to directory and user
    if (link) {
      directory.user = req.body.user;
      user.directory = directory._id;
      if (user.role === "Customer") user.role = "Client";
      await directory.save();
      await user.save();
    }

    return res.status(200).json({
      success: true,
      directory,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/directory/edit/:id
exports.editDirectory = async (req, res, next) => {
  try {
    // Checking if the directory exists
    const directory = await Directory.findById(req.params.id);
    if (!directory) return next(new ErrorResponse("Cannot find the directory", 404));

    // Updating fields
    if (req.body.username) {
      if (await Directory.findOne({ username: req.body.username }))
        return next(new ErrorResponse("Username is already taken. Try another one", 400));
      const lookups = [
        "shop",
        "username",
        "directory",
        "directories",
        "profile",
        "profiles",
        "account",
        "accounts",
        "ngo",
        "ngos",
        "service",
        "services",
        "home",
        "contact",
        "contactus",
        "feedback",
        "help",
        "terms",
        "conditions",
        "donate",
        "product",
        "products",
        "purchase",
        "sell",
        "seller",
        "buyer",
        "purchases",
        "tnc",
        "privacy",
        "policy",
        "privacypolicy",
        "privacy-policy",
        "terms-and-conditions",
        "tnc",
        "api",
      ];
      for (const lookup of lookups) {
        if (req.body.username.toLowerCase().indexOf(lookup) !== -1)
          return next(new ErrorResponse("Invalid username. Try another one", 400));
      }
      directory.username = req.body.username;
    }
    if (req.body.storeName) directory.storeName = req.body.storeName;
    // Category in formdata is in string format instead of array
    if (req.body.category) directory.category = req.body.category.split(",");
    if (req.body.number) directory.number = req.body.number;
    if (req.body.address) directory.address = req.body.address;
    if (req.body.city) directory.city = req.body.city;
    if (req.body.state) directory.state = req.body.state;
    if (req.body.pincode) directory.pincode = req.body.pincode;
    // Details in formdata is in JSON stringify format instead of array of objects
    if (req.body.details) directory.details = JSON.parse(req.body.details);
    // Features in formdata is in string format instead of array
    if (req.body.features) directory.features = req.body.features.split(",");
    if (req.body.description) directory.description = req.body.description;
    if (req.body.website) directory.website = req.body.website;
    if (req.body.tagline) directory.tagline = req.body.tagline;
    // Files contain directoryImages
    if (req.files) {
      const newImages = req.files.map((image) => `/uploads/${image.filename}`);
      directory.directoryImages = directory.directoryImages.concat(newImages);
    }
    // Manually changing directory images array to remove some previous ones
    if (req.body.directoryImages) directory.directoryImages = req.body.directoryImages.split(",");
    if (req.body.directoryImages === "") directory.directoryImages = [];
    await directory.save();

    return res.status(200).json({
      success: true,
      directory,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/directory/approve/:id
exports.approveDirectory = async (req, res, next) => {
  try {
    // Checking if the directory exists
    const directory = await Directory.findById(req.params.id);
    if (!directory) return next(new ErrorResponse("Cannot find the directory", 404));

    directory.isApproved = true;
    directory.approvedAt = Date.now();
    await directory.save();

    return res.status(200).json({
      success: true,
      directory,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/directory/remove/:id
exports.removeDirectory = async (req, res, next) => {
  try {
    // Checking if the directory exists
    const directory = await Directory.findById(req.params.id).select("+user").populate("user");
    if (!directory) return next(new ErrorResponse("Cannot find the directory", 404));

    // Removing directory reference from the linked user
    if (directory.user?.directory) {
      directory.user.directory = null;
      await directory.user.save();
    }

    await directory.remove();
    return res.status(200).json({
      success: true,
      directory,
    });
  } catch (error) {
    next(error);
  }
};
