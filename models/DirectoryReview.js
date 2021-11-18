const mongoose = require("mongoose");

const DirectoryReviewSchema = mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Directory",
    required: true,
  },
  subject: {
    type: String,
    required: [true, "Please provide a review subject"],
    minlength: [6, "Subject is too short"],
    maxlength: [32, "Subject is too long"],
  },
  comment: {
    type: String,
    required: [true, "Please provide a review comment"],
    minlength: [6, "Comment is too short"],
    maxlength: [1024, "Comment is too long"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating should be between 1 and 5"],
    max: [5, "Rating should be between 1 and 5"],
  },
});

const DirectoryReview = mongoose.Model("DirectoryReview", DirectoryReviewSchema);
module.exports = DirectoryReview;
