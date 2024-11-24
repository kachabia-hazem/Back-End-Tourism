require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./services/database"); // MongoDB connection
const errors = require("./middlewares/errors.js"); // Error handling middleware

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Define your routes
app.use('/uploads', express.static('uploads'));
app.use("/users", require("./routes/User.route.js"));
app.use("/packages", require("./routes/Package.route.js"));
app.use("/reservations", require("./routes/Reservation.route.js"));

// Error handling middleware
app.use(errors.errorHandler);

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
