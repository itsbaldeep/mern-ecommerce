// Dependencies
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provie a product name"],
      minlength: [5, "Product name is too short"],
      maxlength: [32, "Product name is too long"],
      trim: true,
    },
    alias: {
      type: [String],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Seller ID not found"],
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
    },
    petType: {
      type: [String],
      min: [1, "Please provide atleast one pet type for this product"],
    },
    breedType: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      minlength: [8, "Description is too short"],
      maxlength: [1024, "Description is too long"],
    },
    weight: {
      type: Number,
      default: 0,
      min: [0, "Product should have a positive weight"],
    },
    size: {
      length: {
        type: Number,
        default: 0,
        min: [0, "Product length cannot be less than 0 meter"],
      },
      width: {
        type: Number,
        default: 0,
        min: [0, "Product width cannot be less than 0 meter"],
      },
      height: {
        type: Number,
        default: 0,
        min: [0, "Product height cannot be less than 0 meter"],
      },
      _id: false,
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
      default: false,
    },
    ageRange: {
      min: {
        type: Number,
        default: 0,
        min: [0, "Age must be a positive number"],
      },
      max: {
        type: Number,
        default: 0,
        min: [0, "Age must be a positive number"],
      },
      _id: false,
    },
    productImages: {
      type: [String],
      set: function (productImages) {
        this._previousProductImages = this.productImages;
        return productImages;
      },
    },
    link: {
      type: String,
    },
    rating: {
      type: Number,
      select: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    numOfReviews: {
      type: Number,
      default: 0,
      select: false,
    },
    reviews: {
      type: [Object],
    },
  },
  { timestamps: true }
);

ProductSchema.pre("save", async function (next) {
  // Deleting previous images if they are updated or removed
  if (this.isModified("productImages")) {
    const previous = this._previousProductImages;
    // Checking for deleted images
    if (previous && previous.length > this.productImages.length) {
      const deletedImages = previous.filter((x) => !this.productImages.includes(x));
      for (const image of deletedImages) {
        const previousPath = path.join(__dirname, "..", "client", "public", image);
        if (fs.existsSync(previousPath)) {
          fs.unlink(previousPath, (err) => err && console.error(err));
        }
      }
    }
  }
  next();
});

ProductSchema.pre("remove", async function (next) {
  // Deleting all images if the product is deleted
  for (const image of this.productImages) {
    const imagePath = path.join(__dirname, "..", "client", "public", image);
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => err && console.error(err));
    }
  }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
