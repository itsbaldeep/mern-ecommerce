// Dependencies
const crypto = require("crypto");

// Utilities
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

// Models
const User = require("../models/User");

// This function generates a new JWT token
const sendToken = async (_user, statusCode, res) => {
  // Refetching the user to make sure private fields aren't sent
  const user = await User.findById(_user._id);
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

// POST /api/user/register
exports.register = async (req, res, next) => {
  try {
    // Taking the credentials and verifying
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorResponse("Please provide name, email and password", 400));
    }

    // Checking if the user already exists
    if (await User.findOne({ email }))
      return next(new ErrorResponse("There is already an account with this email", 401));

    // Creating a new user
    const user = await User.create(req.body);

    // Generating a verification token
    const verificationToken = user.getVerificationToken();
    await user.save();

    // Generating a verification url and message
    const verifyUrl = `${process.env.SITE_URL}/verify/${verificationToken}`;
    const message = `
            <h1>Petohub account verification</h1>
            <p>Please go to this link to verify your account</p>
            <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
        `;

    // Sending the email
    try {
      await sendEmail({
        to: user.email,
        subject: "Petohub Account Verification",
        text: message,
      });
      return res.status(200).json({
        success: true,
        data: "Email for account verification has been sent successfully",
      });
    } catch (error) {
      return next(new ErrorResponse("Email couldn't be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

// GET /api/user/verify/:verificationToken
exports.verify = async (req, res, next) => {
  // Hashing the token
  const verificationToken = crypto
    .createHash("sha256")
    .update(req.params.verificationToken)
    .digest("hex");

  try {
    // Finding the user based on the token
    const user = await User.findOne({ verificationToken });
    if (!user) return next(new ErrorResponse("Invalid Verification Token", 400));

    // Verifying the account
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verifiedAt = Date.now();
    await user.save();

    // Returning a success message
    return await sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// POST /api/user/login
exports.login = async (req, res, next) => {
  // Taking the credentials and verifying
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  // Finding the user
  try {
    const user = await User.findOne({ email }).select("+password");

    // Don't let people know whether a certain email exists
    if (!user) {
      return next(new ErrorResponse("Your email or password is incorrect", 401));
    }

    // Checking if the account is verified
    if (!user.isVerified) {
      return next(new ErrorResponse("Account has not been verified yet"), 403);
    }

    // Comparing the password
    const isMatched = await user.matchPasswords(password);
    if (!isMatched) {
      return next(new ErrorResponse("Your email or password is incorrect", 401));
    }

    // Success response
    return await sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST /api/user/forgotpassword
exports.forgotPassword = async (req, res, next) => {
  // Finding the user
  try {
    const user = await User.findOne({ email: req.body.email });

    // Don't let people know whether a certain email exists or not
    if (!user) {
      return next(new ErrorResponse("The email couldn't be sent", 404));
    }

    // Generating a reset token
    const resetToken = user.getResetToken();
    await user.save();

    // Generating a reset password url and the email message
    const resetUrl = `${process.env.SITE_URL}/resetpassword/${resetToken}`;
    const message = `
            <h1>You have requested to reset your password</h1>
            <p>Please go to this link to reset</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

    // Sending the email
    try {
      await sendEmail({
        to: user.email,
        subject: "Petohub Password Reset Request",
        text: message,
      });
      res.status(200).json({
        success: true,
        data: "Email for password reset has been sent successfully",
      });
    } catch (error) {
      // In case of an error, remove the reset password token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ErrorResponse("Email couldn't be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

// PUT /api/user/resetpassword/:resetToken
exports.resetPassword = async (req, res, next) => {
  // Hashing the token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  // Finding the user
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return next(
        new ErrorResponse("Password reset token is either invalid or has been expired", 400)
      );

    // Resetting the password and saving changes
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      data: "Password resetted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Only private controllers below
 */

// GET /api/user/me
exports.getDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({
    success: true,
    user,
  });
};

// PUT /api/user/updatepassword
exports.updatePassword = async (req, res, next) => {
  // Finding the user
  const user = await User.findById(req.user.id).select("+password");

  // Comparing the password
  const isMatched = await user.matchPasswords(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorResponse("You have entered the wrong current password", 401));
  }

  // Updating the password
  user.password = req.body.newPassword;
  await user.save();

  return await sendToken(user, 200, res);
};

// PUT /api/user/updateprofile
exports.updateProfile = async (req, res, next) => {
  // Checking for the new name in request body
  if (!req.body.name) {
    return next(new ErrorResponse("Please provide a name"));
  }

  // Updating the user
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Admin routes
 */

// GET /api/user/
exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({
    success: true,
    users,
  });
};

// GET /api/user/:id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorResponse("User not found", 404));

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/user/add
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    user.isVerified = true;
    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/user/edit/:id
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/user/delete/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
