const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true }, // Ensuring job title is required
  responsibilities: { type: [String], required: true }, // Responsibilities should always be present
  skillsRequired: { type: [String], required: true }, // List of required skills
  qualifications: { type: [String], required: true }, // Educational or certification requirements
  opportunities: [String],
  otherDetails: { type: String }, // Additional job-related details
  dateCreated: { type: Date, default: Date.now },
}, { timestamps: true }); // Auto-generates createdAt and updatedAt timestamps

module.exports = mongoose.model('JobDescription', jobDescriptionSchema);


