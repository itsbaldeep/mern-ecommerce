const Customer = require("../../models/Customer");
const ErrorResponse = require("../../utils/errorResponse");

// Admin is already authenticated

// GET /panel/customer/
exports.getCustomer = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        return res.status(200).json({
            success: true,
            customers,
        });
    } catch (error) {
        next(error);
    }
};

// GET /panel/customer/:id
exports.getCustomerById = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return next(new ErrorResponse("Customer not found", 404));
        }
        return res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        next(error);
    }
};

// POST /panel/customer/add
exports.addCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.create({ ...req.body });
        customer.isVerified = true;
        await customer.save();
        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /panel/customer/remove/:id
exports.removeCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        // Check if the customer exists
        if (!customers) {
            return next(new ErrorResponse("Customer not found", 404));
        }
        // Delete the customer
        await customer.remove();
        return res.status(200).json({
            success: true,
            message: "Customer succesfully removed",
            customer,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /panel/customer/edit/:id
exports.editCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        // Check if the customer exists
        if (!customer) {
            return next(new ErrorResponse("Customer not found", 404));
        }
        // Updating the Customer
        const result = await Customer.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.status(200).json({
            success: true,
            updated: req.body,
            message: "Customer succesfully updated",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
