// Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Init express and mongoDB
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the database."))
  .catch(console.error);

// User routes
app.use("/api/user", require("./routes/user"));

// Product and Service routes
app.use("/api/product", require("./routes/product"));
app.use("/api/service", require("./routes/service"));

// Middlewares
app.use(require("./middleware/errorHandler"));

// Starting server
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
