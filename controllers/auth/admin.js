const Admin = require("../../models/Admin");
const ErrorResponse = require("../../utils/errorResponse");

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new ErrorResponse("Please provide username and password", 400));
    }
    try {
        const admin = await Admin.findOne({ username }).select("+password");
        if (!admin) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        const isMatched = await admin.matchPasswords(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        const token = admin.getSignedToken();
        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        next(error);
    }
};
