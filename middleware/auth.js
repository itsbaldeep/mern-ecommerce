// Libraries
const jwt = require("jsonwebtoken");

// Utilities
const ErrorResponse = require("../utils/errorResponse");

// Models
const User = require("../models/User");

// This route verifies if the user has an authorized token
exports.protect = async (req, res, next) => {
  // Getting the token from headers
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1];
  if (!token) return next(new ErrorResponse("Not authorized to access this route", 401));

  // Verifying that the token is real
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("Invalid authorization token", 404));
    }
    // Passing the user object along to the controller
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

exports.roles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new ErrorResponse("Not authorized to access this route", 403));
    next();
  };
