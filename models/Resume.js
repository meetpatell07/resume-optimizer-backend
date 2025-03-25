// models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userName: String,
  resumeContent: String,
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDescription' },
  atsScore: { type: Number, default: null }, // ATS score (0-100)
  optimizedContent: { type: String, default: "" }, // Storing AI-optimized resume
  dateCreated: { type: Date, default: Date.now },
}, { timestamps: true }); // Auto-generates createdAt and updatedAt timestamps

module.exports = mongoose.model('Resume', resumeSchema);
