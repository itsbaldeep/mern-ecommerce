const Newsletter = require("../models/Newsletter");
const ErrorResponse = require("../utils/errorResponse");

/*
 * Public routes
 */

// POST /api/newsletter/subscribe
exports.subscribe = async (req, res, next) => {
  try {
    // Check if there is already a newsletter with the email
    let newsletter = await Newsletter.findOne({ email: req.body.email });

    // Create a new listing
    if (!newsletter) newsletter = await Newsletter.create({ email: req.body.email });
    // If the email is unsubscribed, then subscribe it
    else if (!newsletter.isSubscribed) {
      newsletter.isSubscribed = true;
      newsletter.subscribedAt = Date.now();
      newsletter.unsubscribedAt = null;
      await newsletter.save();
    }
    // If the email is already subscribed, return error
    else return next(new ErrorResponse("Email is already subscribed", 400));
    return res.status(200).json({
      success: true,
      newsletter,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/newsletter/unsubscribe
exports.unsubscribe = async (req, res, next) => {
  try {
    // Check if the email is not already subscribed
    // TODO: use proper authentication to check if the user is the owner of the email
    const newsletter = await Newsletter.findOne({ email: req.body.email });
    if (!newsletter) return next(new ErrorResponse("Email is not subscribed", 400));

    // Check if email is already unsubscribed
    if (!newsletter.isSubscribed)
      return next(new ErrorResponse("Email is already unsubscribed", 400));

    // Unsubscribe the email
    newsletter.isSubscribed = false;
    newsletter.unsubscribedAt = Date.now();
    await newsletter.save();

    return res.status(200).json({
      success: true,
      newsletter,
    });
  } catch (error) {
    next(error);
  }
};
