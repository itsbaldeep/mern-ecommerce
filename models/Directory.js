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
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
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
      maxlength: [64, "Address is too long"],
    },
    category: {
      type: [String],
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
    features: {
      type: [
        {
          type: String,
          minlength: [4, "Feature length is too short"],
          maxlength: [16, "Feature length is too long"],
        },
      ],
      default: [],
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
      maxlength: [1024, "Description is too long"],
      default: "",
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    ratings: {
      type: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "DirectoryReview",
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
  next();
});

const Directory = mongoose.model("Directory", DirectorySchema);
module.exports = Directory;
