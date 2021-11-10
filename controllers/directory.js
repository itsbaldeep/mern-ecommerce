// Models
const User = require("../models/User");

// GET /api/directory
exports.getDirectories = async (req, res, next) => {
  const directories = await User.find({ role: "Client", isApproved: true });
  return res.status(200).json({
    success: true,
    directories,
  });
};

// GET /api/directory/:username
exports.getDirectory = async (req, res, next) => {
  const directory = await User.findOne({
    role: "Client",
    isApproved: true,
    username: req.params.username,
  });
  return res.status(200).json({
    success: true,
    directory,
  });
};
