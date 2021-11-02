// Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      maxlength: [32, "Name is too long"],
      minlength: [3, "Name is too short"],
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
      minlength: [8, "Password must have atleast eight or more characters"],
      select: false,
    },
    storeName: {
      type: String,
      maxlength: [64, "Store name is too long"],
      minlength: [3, "Store name is too short"],
    },
    description: {
      type: String,
      maxlength: [1024, "Description is too long"],
      minlength: [8, "Description is too short"],
    },
    address: {
      type: String,
      minlength: [8, "Address is too short"],
      maxlength: [256, "Address is too long"],
    },
    website: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        "Please provide a valid website",
      ],
    },
    category: [String],
    imageURL: {
      type: String,
    },
    username: {
      type: String,
    },
    details: {
      type: Array,
      default: [],
    },
    features: [String],
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    number: {
      type: String,
      match: [
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
        "Please provide a valid phone number",
      ],
    },
    role: {
      type: String,
      default: "Customer",
      immutable: true,
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
    verifiedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Encrypting the password everytime before saving
UserSchema.pre("save", async function (next) {
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
UserSchema.methods.getVerificationToken = function () {
  const verificationToken = crypto.randomBytes(20).toString("hex");
  this.verificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  return verificationToken;
};

// Matching passwords entered by the user with the correct password
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating a signed JWT token to give authorization
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating a password reset token
UserSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
