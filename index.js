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
    .then(() => console.log("Conntected to the database."))
    .catch(console.error);

// Authentication routes
app.use("/api/auth/customer", require("./routes/auth/customer"));
// app.use("/api/auth/client", require("./routes/auth/client"));
// app.use("/api/auth/employee", require("./routes/auth/employee"));

// Middlewares
app.use(require("./middleware/errorHandler"));

// Starting server
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
