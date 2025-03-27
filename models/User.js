const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactInfo: { type: String },
  email: { type: String, required: true, unique: true },
  location: { type: String },
  linkedIn: { type: String, required: false },
  github: { type: String, required: false },
  portfolio: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
