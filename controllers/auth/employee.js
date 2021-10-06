const Employee = require("../../models/Employee");
const ErrorResponse = require("../../utils/errorResponse");

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new ErrorResponse("Please provide username and password", 400));
    }
    try {
        const employee = await Employee.findOne({ username }).select("+password");
        if (!employee) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        const isMatched = await Employee.matchPasswords(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        const token = employee.getSignedToken();
        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        next(error);
    }
};
