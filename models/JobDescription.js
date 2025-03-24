// models/JobDescription.js
const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  responsibilities: [String],
  opportunities: [String],
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobDescription', jobDescriptionSchema);
