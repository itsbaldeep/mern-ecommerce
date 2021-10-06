const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const Client = require("../models/Client");
const Admin = require("../models/Admin");

// This route verifies if the user has an authorized token
exports.protect = async (req, res, next) => {
    // Getting the token from headers
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    // Verifying that the token is real
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const client = await Client.findById(decoded.id);
        const admin = await Admin.findById(decoded.id);
        if (!admin && !client) {
            return next(new ErrorResponse("Invalid token", 404));
        }
        // Saving the appropriate object in the request object and going to next controller
        if (admin) req.adminData = admin;
        if (client) req.clientData = client;
        next();
    } catch (err) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
};

exports.isAdmin = (req, res, next) => {
    if (!req.adminData) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
    next();
};
