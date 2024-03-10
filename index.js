if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bp = require("body-parser");
const cors = require("cors");

// express app
const app = express();
app.use(cors());

// PORT to run the app on (default = 5000)
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
// logger middleware
app.use(morgan("dev"));

// body parser for url encoded data (form data)
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// MongoDB connection
const dbUsername = "chaitanya_9064";
const dbPassword = "Chaitanya"; // Assuming this is your actual password
const dbName = "Hospital"; // Replace with your actual database name
const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.zecxwnj.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// handle patient routes
app.use("/patient", require("./routes/patient/patientRoutes"));

// handle staff routes
app.use("/staff", require("./routes/staff/staffRoutes"));
