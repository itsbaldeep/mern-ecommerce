const Employee = require("../../models/Employee");
const ErrorResponse = require("../../utils/errorResponse");

// Admin is already authenticated

// GET /panel/emplotee/
exports.getEmployee = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json({
            success: true,
            employees,
        });
    } catch (error) {
        next(error);
    }
};

// GET /panel/employee/:id
exports.getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return next(new ErrorResponse("Employee not found", 404));
        }
        return res.status(200).json({
            success: true,
            employee,
        });
    } catch (error) {
        next(error);
    }
};

// POST /panel/employee/add
exports.addEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create({ ...req.body });
        await employee.save();
        res.status(200).json({
            success: true,
            employee,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /panel/employee/remove/:id
exports.removeEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        // Check if the employee exists
        if (!employees) {
            return next(new ErrorResponse("Employee not found", 404));
        }
        // Delete the employee
        await employee.remove();
        return res.status(200).json({
            success: true,
            message: "Employee succesfully removed",
            employee,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /panel/employee/edit/:id
exports.editEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        // Check if the employee exists
        if (!employee) {
            return next(new ErrorResponse("Employee not found", 404));
        }
        // Updating the employee
        const result = await Employee.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.status(200).json({
            success: true,
            updated: req.body,
            message: "Employee succesfully updated",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
