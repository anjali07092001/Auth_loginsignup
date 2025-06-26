const mongoose = require('mongoose');

// Corrected: Use 'Schema' with a capital 'S' and assign it directly
const Schema = mongoose.Schema;

// Renamed to UserSchema for better consistency with convention
const UserSchema = new Schema({
    // Changed 'name' to 'username' to align with common authentication practices
    // and the previous controller code I helped you fix.
    // If your frontend sends 'name', change this back, or adjust the frontend.
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures each email is unique
    },
    // Corrected: 'Password' to 'password' (lowercase 'p') for consistency
    // with JavaScript variable naming conventions and database field names.
    // This is important because the bcrypt hashing and comparison functions will look for 'password'.
    password: {
        type: String,
        required: true,
    },
    // It's good practice to add a createdAt timestamp
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Using 'User' as the model name is a common convention, Mongoose will
// pluralize it to 'users' collection automatically.
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;