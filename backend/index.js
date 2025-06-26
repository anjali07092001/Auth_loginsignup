const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file (should be at the top)

// Import the connectDB function from your db.js file
const connectDB = require('./models/db'); // Assuming this is the correct path

// --- Call the connectDB function to establish the database connection ---
// It's good practice to call this before setting up routes that might use the DB.
connectDB();

// --- Middleware ---
// These should come before your routes
app.use(express.json()); // For parsing JSON request bodies
app.use(cors());         // Enable CORS for all origins (important for local development across different ports)

// --- Routes ---
const AuthRouter = require("./routes/AuthRouter");
// --- IMPORTANT CORRECTION HERE ---
// Change '/auth' to '/api' to match the frontend's fetch URL: 'http://localhost:5000/api/signup'
app.use('/api', AuthRouter);

// --- Basic Ping Route (for server health check) ---
app.get('/ping', (req, res) => {
    res.send('pong');
});

// --- Server Listening ---
// Use the PORT from environment variables, or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});