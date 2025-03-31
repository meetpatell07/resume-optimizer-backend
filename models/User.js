const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

  fullName: { type: String, required: true },
  contactInfo: {
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },  
    email: { type: String, required: true, unique: true },
    location: { type: String },
    linkedIn: { type: String, required: false },
    github: { type: String, required: false },
    portfolio: { type: String, required: false },
    password: {
        type: String,
        required: false,
        minlength: [8, "Password must be at least 8 characters long"],
    },

});

// Instance method to verify password
// verify if the given password matches the user's hased password stored in database
userSchema.methods.verifyPassword = async function (password) { // takes a password parameter
    const user = this; // refers to the current user document
    const isMatch = await bcrypt.compare(password, user.password); // bcrypt compare the password given with the hased password
    return isMatch // return booleans
}

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is new or modified
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
});

module.exports = mongoose.model('User', userSchema);
