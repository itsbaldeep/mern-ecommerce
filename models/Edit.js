const mongoose = require("mongoose");

const EditSchema = mongoose.Schema(
  {
    date: Date,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    changes: Object,
  },
  { timestamps: true }
);

const Edit = mongoose.model("Edit", EditSchema);
module.exports = Edit;
