const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
AdminSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};
AdminSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
