//import express
//initialise express
// port define
//listen the port

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { connectDb } = require("./db/connection");

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Define port
const port = process.env.PORT || 5000;

// Handle CORS
app.use(cors({ origin: process.env.CLIENT_URL }));

// Middleware to parse JSON
app.use(express.json());

// Connect to database
connectDb();

// Root route

app.get("/", (req, res) => {
  res.send(`<center><h1>Searver running on port ${port}</h1></center>`);
});


// Dynamic route inclusion
readdirSync("./routes").forEach((route) => {
  app.use(`/api`, require(`./routes/${route}`)); // ✅ Fixed route prefix
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
