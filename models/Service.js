// Dependencies
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [4, "Service name is too short"],
      maxlength: [32, "Service name is too long"],
      required: [true, "Please provie a service name"],
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
    address: {
      type: String,
      required: [true, "Please provide an address for this service"],
      minlength: [8, "Address is too short"],
      maxlength: [128, "Address is too long"],
    },
    nameOfIncharge: {
      type: String,
      required: [true, "Please provide name of the person in charge"],
      minlength: [3, "Incharge name is too short"],
      maxlength: [32, "Incharge name is too long"],
    },
    numberOfIncharge: {
      type: String,
      required: [true, "Please provide number of the person in charge"],
      match: [
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
        "Please provide a valid phone number",
      ],
    },
    timings: {
      from: {
        type: String,
        default: "0000",
      },
      to: {
        type: String,
        default: "2359",
      },
      _id: false,
    },
    // Days will be evaluated using bitwise &
    // sun=1, mon=2, tue=4, wed=8, thu=16, fri=32, sat=64
    days: {
      type: Number,
      default: 127,
    },
    category: {
      type: String,
      required: [true, "Please provide a service category"],
    },
    petType: {
      type: [String],
      min: [1, "Please provide atleast one pet type for this service"],
      required: [true, "Please provide a pet type for this serviec"],
    },
    breedType: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Please provide a service description"],
      minlength: [8, "Description is too short"],
      maxlength: [1024, "Description is too long"],
    },
    price: {
      type: Number,
      min: [1, "Price can't be lower than 1"],
      required: [true, "Please provide a price"],
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
    serviceImages: {
      type: [String],
      set: function (serviceImages) {
        this._previousProductImages = this.serviceImages;
        return serviceImages;
      },
    },
    link: {
      type: String,
      default: "",
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

ServiceSchema.pre("save", async function (next) {
  // Deleting previous images if they are updated or removed
  if (this.isModified("serviceImages")) {
    const previous = this._previousServiceImages;
    // Checking for deleted images
    if (previous && previous.length > this.serviceImages.length) {
      const deletedImages = previous.filter((x) => !this.serviceImages.includes(x));
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

ServiceSchema.pre("remove", async function (next) {
  // Deleting all images if the service is deleted
  for (const image of this.serviceImages) {
    const imagePath = path.join(__dirname, "..", "client", "public", image);
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => err && console.error(err));
    }
  }
  next();
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
