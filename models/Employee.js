const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EmployeeSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

EmployeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
EmployeeSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};
EmployeeSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
