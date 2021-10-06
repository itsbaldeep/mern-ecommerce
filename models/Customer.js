// Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
            maxlength: [64, "Name is too long"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            lowercase: true,
            trim: true,
            match: [
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                "Please provide a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [8, "Password is too short"],
            select: false,
        },
        number: {
            type: String,
            match: [
                /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
                "Please provide a valid phone number",
            ],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpire: {
            type: Date,
        },
    },
    { timestamps: true }
);

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

// Generating an account verification token
CustomerSchema.methods.getVerificationToken = function () {
    const verificationToken = crypto.randomBytes(20).toString("hex");
    this.verificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
    return verificationToken;
};

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
