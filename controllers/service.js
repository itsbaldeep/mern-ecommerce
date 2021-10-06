const Service = require("../models/Service");
const ErrorResponse = require("../utils/errorResponse");

exports.getServices = async (req, res, next) => {
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

exports.getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return next(new ErrorResponse("Service not found", 404));
        }
        return res.status(200).json({
            success: true,
            service,
        });
    } catch (error) {
        next(error);
    }
};

exports.addService = async (req, res, next) => {
    try {
        if (req.clientData) req.body.seller = req.clientData._id;
        const service = await Service.create({ ...req.body });
        console.log(req.body);
        await service.save();
        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        next(error);
    }
};

exports.removeService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        // Check if the service exists
        if (!service) {
            return next(new ErrorResponse("Service not found", 404));
        }
        // Check if the current user is the seller of that service
        if (req.clientData && service.seller.toString() != req.clientData._id.toString()) {
            return next(new ErrorResponse("Unable to remove service", 404));
        }
        // Delete the service
        await service.remove();
        return res.status(200).json({
            success: true,
            message: "Service succesfully removed",
            service,
        });
    } catch (error) {
        next(error);
    }
};

exports.editService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        // Check if the service exists
        if (!service) {
            return next(new ErrorResponse("Service not found", 404));
        }
        // Check if the current user is the seller of that service
        if (req.clientData && service.seller.toString() != req.clientData._id.toString()) {
            return next(new ErrorResponse("Unable to remove service", 404));
        }
        // Updating the service
        const result = await Service.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.status(200).json({
            success: true,
            message: "Service succesfully updated",
            data: result,
            updated: req.body,
        });
    } catch (error) {
        next(error);
    }
};
