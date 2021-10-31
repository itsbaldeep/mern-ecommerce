// Dependencies
const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [4, "Service name is too short"],
      required: [true, "Please provie a service name"],
      trim: true,
      maxlength: [32, "Service name is too long"],
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
      type: {
        from: {
          type: Date,
          required: [true, "Please provide valid timings"],
        },
        to: {
          type: Date,
          required: [true, "Please provide valid timings"],
        },
      },
    },
    // Days will be evaluated using bitwise &
    // sun=1, mon=2, tue=4, wed=8, thu=16, fri=32, sat=64
    days: {
      type: Number,
      min: [1, "Put atleast one day for this service"],
      required: [true, "Please mention the days of availability of this service"],
    },
    category: {
      type: String,
      enum: ["Health", "Vaccination", "Cleaning", "Housing", "Maintenance", "Training", "Others"],
      required: [true, "Please provide a service category"],
    },
    petType: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "Fish", "Other"],
      required: [true, "Please provide a pet type for this service"],
    },
    breedType: {
      type: String,
    },
    description: {
      type: String,
      minlength: [8, "Description is too short"],
      required: [true, "Please provide a service description"],
      maxlength: [1024, "Description is too long"],
    },
    price: {
      type: Number,
      min: [1, "Price can't be lower than 1"],
      required: [true, "Please provide a price"],
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
    imageURLs: {
      type: [String],
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
      select: false,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
