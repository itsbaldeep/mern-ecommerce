// Dependencies
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const DirectorySchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: [true, "Please provide a business/store name"],
      maxlength: [64, "Store name is too long"],
      minlength: [3, "Store name is too short"],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: null,
      select: false,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Please provide a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
      minlength: [8, "Address is too short"],
      maxlength: [256, "Address is too long"],
    },
    category: {
      type: [{ type: String, ref: "Category" }],
      minlength: [1, "Please provide atleast one category"],
    },
    state: {
      type: String,
      required: [true, "Please provide a state"],
      minlength: [2, "State name is too short"],
      maxlength: [16, "State name is too long"],
    },
    city: {
      type: String,
      required: [true, "Please provide a city"],
      minlength: [2, "City name is too short"],
      maxlength: [16, "City name is too long"],
    },
    pincode: {
      type: String,
      required: [true, "Please provide a pincode"],
      match: [/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/g, "Please provide a valid pincode"],
    },
    number: {
      type: String,
      required: [true, "Please provide a phone number"],
      match: [
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
        "Please provide a valid phone number",
      ],
    },
    products: {
      type: [String],
      default: [],
      validate: [(arr) => arr.length <= 25, "Too many products"],
    },
    services: {
      type: [String],
      default: [],
      validate: [(arr) => arr.length <= 25, "Too many services"],
    },
    location: {
      type: {
        _id: false,
        lat: Number,
        lng: Number,
      },
      default: {
        lat: null,
        lng: null,
      },
    },
    timings: {
      type: [
        {
          _id: false,
          from: String,
          to: String,
        },
      ],
      default: [],
      validate: [(arr) => arr.length <= 7, "You can have at most 7 timings"],
    },
    faq: {
      type: [
        {
          _id: false,
          question: {
            type: String,
            required: true,
            minlength: [4, "Question is too short"],
            maxlength: [120, "Question is too long"],
          },
          answer: {
            type: String,
            required: true,
            minlength: [4, "Answer is too short"],
            maxlength: [1024, "Answer is too long"],
          },
        },
      ],
      default: [],
      validate: [(arr) => arr.length <= 10, "Too many FAQs"],
    },
    gallery: {
      type: [String],
      default: [],
    },
    features: {
      type: [
        {
          type: String,
          minlength: [4, "Feature length is too short"],
          maxlength: [16, "Feature length is too long"],
        },
      ],
      default: [],
      validate: [(arr) => arr.length <= 10, "Too many features"],
    },
    details: {
      type: [
        {
          title: {
            type: String,
            minlength: [4, "Details title is too short"],
            maxlength: [12, "Details title is too long"],
          },
          content: {
            type: String,
            minlength: [4, "Details content is too short"],
            maxlength: [64, "Details content is too long"],
          },
          _id: false,
        },
      ],
      default: [],
      validate: [(arr) => arr.length <= 10, "Too many details"],
    },
    directoryImages: {
      type: [String],
      set: function (directoryImages) {
        this._previousDirectoryImages = this.directoryImages;
        return directoryImages;
      },
      default: [],
    },
    website: {
      type: String,
      lowercase: true,
      default: "",
      trim: true,
      match: [
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        "Please provide a valid website",
      ],
    },
    tagline: {
      type: String,
      maxlength: [32, "Tagline is too long"],
      default: "",
    },
    description: {
      type: String,
      maxlength: [4096, "Description is too long"],
      default: "",
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    reviews: {
      type: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Review",
        },
      ],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

DirectorySchema.pre("save", async function (next) {
  // Handling username
  if (!this.username) this.username = this._id.toString();

  // Deleting preious directory images
  if (this.isModified("directoryImages")) {
    const previous = this._previousDirectoryImages;
    // Checking for deleted images
    if (previous && previous.length > this.directoryImages.length) {
      const deletedImages = previous.filter((x) => !this.directoryImages.includes(x));
      for (const image of deletedImages) {
        const previousPath = path.join(__dirname, "..", "client", "public", image);
        if (fs.existsSync(previousPath)) {
          fs.unlink(previousPath, (err) => err && console.error(err));
        }
      }
    }
  }
  // Set approval to false every time the document is updated
  if (!this.isModified("isApproved")) this.isApproved = false;
  next();
});

// Virtual field for ratings
DirectorySchema.virtual("rating").get(function () {
  this.populate("reviews");
  let rating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  this.reviews.forEach((review) => rating[review.rating]++);
  return rating;
});

const Directory = mongoose.model("Directory", DirectorySchema);
module.exports = Directory;
