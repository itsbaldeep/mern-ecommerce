const Client = require("../../models/Client");
const ErrorResponse = require("../../utils/errorResponse");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");

exports.register = async (req, res, next) => {
    try {
        //  Creating a new client
        const client = await Client.create(req.body);

        // Generating a verification token
        const verificationToken = client.getVerificationToken();
        await client.save();

        // Generating a verification url and message
        const verifyUrl = `${process.env.SITE_URL}/client/verify/${verificationToken}`;
        const message = `
            <h1>Account Verification</h1>
            <p>Please go to this link to verify your account</p>
            <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
        `;

        // Sending the email
        try {
            await sendEmail({
                to: client.email,
                subject: "Account Verification Link",
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

exports.verify = async (req, res, next) => {
    // Hashing the token
    const verificationToken = crypto.createHash("sha256").update(req.params.verificationToken).digest("hex");
    try {
        // Finding the client based on the token
        const client = await Client.findOne({ verificationToken });
        if (!client) return next(new ErrorResponse("Invalid Verification Token", 400));

        // Verifying the account
        client.isVerified = true;
        client.verificationToken = undefined;
        await client.save();

        return res.status(201).json({
            success: true,
            data: "Account verified successfully",
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    // Taking the credentials and verifying
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400));
    }
    try {
        // Getting the email
        const client = await Client.findOne({ email }).select("+password");

        // Don't let people know whether a certain email exists
        if (!client) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Comparing the password
        const isMatched = await client.matchPasswords(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Checking if the account is verified
        if (!client.isVerified) {
            return next(new ErrorResponse("Account has not been verified yet"), 401);
        }

        // Success response
        return sendToken(client, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        // Finding the client
        const client = await Client.findOne({ email });
        if (!client) {
            // Don't let people know whether a certain email exists or not
            return next(new ErrorResponse("The email couldn't be sent", 404));
        }

        // Generating a reset token and saving changes to the DB
        const resetToken = client.getResetToken();
        await client.save();

        // Generating a reset password url and the email message
        const resetUrl = `${process.env.SITE_URL}/client/resetpassword/${resetToken}`;
        const message = `
            <h1>You have requested to reset your password</h1>
            <p>Please go to this link to reset</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        // Sending the email
        try {
            await sendEmail({
                to: client.email,
                subject: "Password Reset Request",
                text: message,
            });
            res.status(200).json({
                success: true,
                data: "Email sent",
            });
        } catch (error) {
            // In case of an error, reset the token and expire and save changes to the DB
            client.resetPasswordToken = undefined;
            client.resetPasswordExpire = undefined;
            await client.save();
            return next(new ErrorResponse("Email couldn't be sent", 500));
        }
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    // Hashing the token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        // Finding the client based on the token
        const client = await Client.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!client) return next(new ErrorResponse("Invalid Reset Token", 400));

        // Resetting the password and saving changes
        client.password = req.body.password;
        client.resetPasswordToken = undefined;
        client.resetPasswordExpire = undefined;
        await client.save();

        return res.status(201).json({
            success: true,
            data: "Password resetted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// This function generates a new JWT token
const sendToken = (client, statusCode, res) => {
    const token = client.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token,
    });
};
