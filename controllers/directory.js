// Models
const Directory = require("../models/Directory");

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
  return res.status(200).json({
    success: true,
    directory,
  });
};
