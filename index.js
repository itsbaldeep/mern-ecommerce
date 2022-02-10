// Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Initializing express and primary middlewares
const app = express();
app.use(express.json());

// Connecting to the database
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the database."))
  .catch(console.error);

// API routes
app.use("/api/user", require("./routes/user"));
app.use("/api/directory", require("./routes/directory"));
app.use("/api/inquiry", require("./routes/inquiry"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/product", require("./routes/product"));
app.use("/api/service", require("./routes/service"));
app.use("/api/category", require("./routes/category"));
app.use("/api/pet", require("./routes/pet"));
app.use("/api/brand", require("./routes/brand"));

// Middlewares
app.use(require("./middleware/errorHandler"));

// Serving static frontend
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "./client/build")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Starting server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
