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
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
    },
    petType: {
      type: [String],
      required: [true, "Please provide a pet type for this product"],
    },
    breedType: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      minlength: [8, "Description is too short"],
      required: [true, "Please provide a product description"],
      maxlength: [1024, "Description is too long"],
    },
    weight: {
      type: Number,
      default: 0,
      min: [1, "Product should have a positive weight"],
    },
    size: {
      type: {
        length: {
          type: Number,
          default: 0,
          min: [1, "Product length cannot be less than 1 meter"],
        },
        width: {
          type: Number,
          default: 0,
          min: [1, "Product width cannot be less than 1 meter"],
        },
        height: {
          type: Number,
          default: 0,
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
      default: false,
    },
    ageRange: {
      type: {
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
      },
    },
    productImages: {
      type: [String],
      set: function (productImages) {
        this._previousProductImages = this.productImages;
        return productImages;
      },
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

UserSchema.pre("save", async function (next) {
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
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
