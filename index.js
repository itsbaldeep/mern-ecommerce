// Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Init express and mongoDB
const app = express();
app.use(express.json());
mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to the database."))
    .catch(console.error);

// Authentication routes
app.use("/api/auth/customer", require("./routes/auth/customer"));
app.use("/api/auth/client", require("./routes/auth/client"));
app.use("/api/auth/admin", require("./routes/auth/admin"));
app.use("/api/auth/employee", require("./routes/auth/employee"));

// Product and Service routes
app.use("/api/product", require("./routes/product"));
app.use("/api/service", require("./routes/service"));

// Control Panel routes
app.use("/api/panel/customer", require("./routes/panel/customer"));
app.use("/api/panel/client", require("./routes/panel/client"));
app.use("/api/panel/employee", require("./routes/panel/employee"));

// Middlewares
app.use(require("./middleware/errorHandler"));

// Starting server
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
