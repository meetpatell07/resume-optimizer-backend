const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobDescription: String,
  companyName: String,
  jobTitle: String,
  responsibilities: String,
  skillsRequired: String,
  qualifications: String,
  opportunities: { type: String, required: false },
  otherDetails: { type: String, required: false },
  generatedResume: String,
  generatedCoverLetter: String,
});

module.exports = mongoose.model('Job', JobSchema);
