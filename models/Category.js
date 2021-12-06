const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Product", "Directory", "Service"],
      required: true,
    },
    pet: { type: [String], default: [] },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// Virtual function to allow dynamic refs to Product, Service, Directory models
CategorySchema.virtual("docs", {
  ref: (doc) => doc.type,
  localField: "name",
  foreignField: "category",
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
