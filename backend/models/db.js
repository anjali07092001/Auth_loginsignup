
const mongoose = require('mongoose');

// It's absolutely crucial that dotenv is configured *before* this file is run.
// This typically means `require('dotenv').config()` should be the very first line
// in your main server entry file (e.g., index.js or server.js).
const mongo_url = process.env.MONGO_CONN;

// --- IMPORTANT: Add a check for the connection URL ---
if (!mongo_url) {
    console.error('CRITICAL ERROR: MONGO_CONN environment variable is not defined.');
    console.error('Please ensure your .env file is correctly configured and loaded.');
    process.exit(1); // Exit the application if the connection string is missing
}

// --- Connection Logic ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_url, {
            // These options are deprecated in newer Mongoose versions but might be needed for older ones
            // Remove them if you're using Mongoose 6.0+ and they cause warnings
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true, // Deprecated in Mongoose 6+
            // useFindAndModify: false // Deprecated in Mongoose 6+
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Connection ERROR: ${err.message}`);
        // Log the full error object in development for more details
        // console.error(err);
        process.exit(1); // Exit process with failure if connection fails
    }
};

module.exports = connectDB; // Export the function so it can be called from index.js