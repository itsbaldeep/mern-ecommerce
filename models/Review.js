const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    comment: {
        type: String,
        min: 6,
        max: 1024,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
});

const Review = mongoose.Model("Review", ReviewSchema);
module.exports = Review;
