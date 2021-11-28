// Dependencies
const crypto = require("crypto");

// Utilities
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

// Models
const User = require("../models/User");
const Directory = require("../models/Directory");

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
    if (!name || !email || !password)
      return next(new ErrorResponse("Please provide name, email and password", 400));

    // Checking if the user already exists
    if (await User.findOne({ email }))
      return next(new ErrorResponse("There is already an account with this email", 401));

    // Handling client registeration
    let user;
    if (req.body.role === "Client") {
      // Creating new directory profile
      const directory = await Directory.create({
        email,
        number: req.body?.number,
        storeName: req.body?.storeName,
        category: req.body?.category,
        address: req.body?.address,
        city: req.body?.city,
        state: req.body?.state,
        pincode: req.body?.pincode,
      });
      // Creating new user profile along with directory id
      user = await User.create({
        name,
        email,
        password,
        number: req.body?.number,
        role: req.body.role,
        directory: directory._id,
      });
      // Adding user object ref to directory object
      directory.user = user._id;
      directory.save();
    }
    // Customer registration
    else user = await User.create({ name, email, password });

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
  const user = await User.findById(req.user.id).populate("directory");
  return res.status(200).json({
    success: true,
    user,
  });
};

// POST /api/user/convertclient
exports.convertClient = async (req, res, next) => {
  try {
    if (req.user.role === "Client")
      return next(new ErrorResponse("This account is already a client account", 401));

    // Handling directory creation and updating user object
    const directory = await Directory.create({
      email: req.user.email,
      user: req.user._id,
      number: req.body?.number,
      storeName: req.body?.storeName,
      category: req.body?.category,
      address: req.body?.address,
      city: req.body?.city,
      state: req.body?.state,
      pincode: req.body?.state,
    });

    // Updating user data and saving
    req.user.directory = directory._id;
    req.user.role = "Client";
    await req.user.save();

    return await sendToken(req.user, 200, res);
  } catch (error) {
    next(error);
  }
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
  try {
    const user = await User.findById(req.user.id).populate("directory");
    // Controlling customer update profile request
    if (req.user.role === "Customer") {
      if (req.body.name) user.name = req.body.name;
      if (req.files?.profileImage)
        user.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
      await user.save();
    }
    // Controlling client update profile request
    else if (req.user.role === "Client") {
      // Getting the directory profile
      const directory = user.directory;
      // Checking for username
      if (req.body.username) {
        if (await Directory.findOne({ username: req.body.username }))
          return next(new ErrorResponse("Username is already taken. Try another one", 400));
        const lookups = [
          "shop",
          "username",
          "directory",
          "directories",
          "profile",
          "profiles",
          "account",
          "accounts",
          "ngo",
          "ngos",
          "service",
          "services",
          "home",
          "contact",
          "contactus",
          "feedback",
          "help",
          "terms",
          "conditions",
          "donate",
          "product",
          "products",
          "purchase",
          "sell",
          "seller",
          "buyer",
          "purchases",
          "tnc",
          "privacy",
          "policy",
          "privacypolicy",
          "privacy-policy",
          "terms-and-conditions",
          "tnc",
          "api",
        ];
        for (const lookup of lookups) {
          if (req.body.username.toLowerCase().indexOf(lookup) !== -1)
            return next(new ErrorResponse("Invalid username. Try another one", 400));
        }
        directory.username = req.body.username;
      }
      if (req.body.name) user.name = req.body.name;
      if (req.body.storeName) directory.storeName = req.body.storeName;
      // Category in formdata is in string format instead of array
      if (req.body.category) directory.category = req.body.category.split(",");
      if (req.body.number) directory.number = req.body.number;
      if (req.body.address) directory.address = req.body.address;
      if (req.body.city) directory.city = req.body.city;
      if (req.body.state) directory.state = req.body.state;
      if (req.body.pincode) directory.pincode = req.body.pincode;
      // Details in formdata is in JSON stringify format instead of array of objects
      if (req.body.details) directory.details = JSON.parse(req.body.details);
      // Features in formdata is in string format instead of array
      if (req.body.features) directory.features = req.body.features.split(",");
      if (req.body.description) directory.description = req.body.description;
      if (req.body.website) directory.website = req.body.website;
      if (req.body.tagline) directory.tagline = req.body.tagline;
      // Files contain single profileImage and multiple directoryImages files
      if (req.files) {
        if (req.files.profileImage)
          user.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
        // ASSUME: the maximum number of files in request = the number of files user can have at most - the number of files user currently have
        if (req.files.directoryImages) {
          const newImages = req.files.directoryImages.map((image) => `/uploads/${image.filename}`);
          directory.directoryImages = directory.directoryImages.concat(newImages);
        }
      }
      // Manually changing directory images array to remove some previous ones
      if (req.body.directoryImages) directory.directoryImages = req.body.directoryImages.split(",");
      if (req.body.directoryImages === "") directory.directoryImages = [];
      await user.save();
      await directory.save();
    }

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
  const users = await User.find().populate("directory");
  return res.status(200).json({
    success: true,
    users,
  });
};

// GET /api/user/:id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("directory");
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
    // Checking if required fields are passed
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return next(new ErrorResponse("Please provide name, email and password", 400));

    // Checking if a user already exists with that email
    if (await User.findOne({ email }))
      return next(new ErrorResponse("There is already a user with that email", 400));

    // Handling client registration
    let user;
    if (req.body.role === "Client") {
      // Creating new directory profile
      const directory = await Directory.create({
        email,
        number: req.body?.number,
        storeName: req.body?.storeName,
        category: req.body?.category,
        address: req.body?.address,
        city: req.body?.city,
        state: req.body?.state,
        pincode: req.body?.pincode,
      });
      // Creating new user profile along with directory id
      user = await User.create({
        name,
        email,
        password,
        number: req.body?.number,
        role: req.body.role,
        directory: directory._id,
      });
      // Adding user object ref to directory object
      directory.user = user._id;
      directory.save();
    }
    // Customer registration
    else user = await User.create({ name, email, password });

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
    // Checking if the user exists
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorResponse("Unable to find the user", 404));

    // Updating fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.role) user.role = req.body.role;
    if (req.body.number) user.number = req.body.number;
    if (req.body.directory) user.directory = req.body.directory;
    if (req.file) user.profileImage = `/uploads/${req.file.filename}`;

    // Saving and returning the user
    await user.save();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/user/verifyaccount/:id
exports.verifyUser = async (req, res, next) => {
  try {
    // Checking if the user exists
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorResponse("Unable to find the user", 404));

    // Checking if the user is already verified
    if (user.isVerified) return next(new ErrorResponse("This user is already verified", 400));

    // Verifying the user
    user.isVerified = true;
    user.verifiedAt = Date.now();
    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// DEL /api/user/remove/:id
exports.removeUser = async (req, res, next) => {
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
