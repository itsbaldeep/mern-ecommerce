// Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const CustomerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide a first name."],
    },
    lastname: {
        type: String,
        required: [true, "Please provide a last name."],
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: "true",
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please provide a valid email.",
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minlength: 8,
        select: false,
    },
    number: {
        type: String,
        required: [true, "Please provide a phone number."],
        minlength: 10,
        match: [null, "Please provide a valid phone number."],
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});

// Encrypting the password everytime before saving
CustomerSchema.pre("save", async function (next) {
    // Don't encrypt password again if it's not modified
    if (!this.isModified("password")) {
        next();
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Matching passwords entered by the user with the correct password
CustomerSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating a signed JWT token to give authorization
CustomerSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Generating a password reset token
CustomerSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
