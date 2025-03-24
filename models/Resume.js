// models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userName: String,
  resumeContent: String,
  jobDescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobDescription' },
  atsScore: Number,
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', resumeSchema);
