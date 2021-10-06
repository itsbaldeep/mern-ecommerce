// Dependencies
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [5, "Product name is too short"],
            required: [true, "Please provie a product name"],
            trim: true,
            maxlength: [32, "Product name is too long"],
        },
        alias: {
            type: [String],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Seller ID not found"],
            ref: "Client",
        },
        category: {
            type: String,
            enum: ["Food", "Cosmetic", "Accessory", "Other"],
            required: [true, "Please provide a product category"],
        },
        petType: {
            type: String,
            enum: ["Dog", "Cat", "Bird", "Fish", "Other"],
            required: [true, "Please provide a pet type for this product"],
        },
        breedType: {
            type: String,
        },
        description: {
            type: String,
            minlength: [8, "Description is too short"],
            required: [true, "Please provide a product description"],
            maxlength: [1024, "Description is too long"],
        },
        weight: {
            type: Number,
            min: [1, "Product should have a positive weight"],
        },
        size: {
            type: {
                length: {
                    type: Number,
                    min: [1, "Product length cannot be less than 1 meter"],
                },
                width: {
                    type: Number,
                    min: [1, "Product width cannot be less than 1 meter"],
                },
                height: {
                    type: Number,
                    min: [1, "Product height cannot be less than 1 meter"],
                },
            },
        },
        countInStock: {
            type: Number,
            min: [1, "There should be atleast 1 item in stock"],
            required: [true, "Please provide a count in stock"],
        },
        price: {
            type: Number,
            min: [1, "Price can't be lower than 1"],
            required: [true, "Please provide a price"],
        },
        isVeg: {
            type: Boolean,
        },
        ageRange: {
            type: {
                min: {
                    type: Number,
                    min: [0, "Age must be a positive number"],
                },
                max: {
                    type: Number,
                    min: [0, "Age must be a positive number"],
                },
            },
        },
        imageURL: {
            type: String,
        },
        rating: {
            type: Number,
            immutable: true,
        },
        numOfReviews: {
            type: Number,
            default: 0,
            immutable: true,
        },
        reviews: {
            type: [Object],
            immutable: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
