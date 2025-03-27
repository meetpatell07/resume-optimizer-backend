const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  responsibilities: { type: String },
  achievements: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
});

module.exports = mongoose.model('WorkExperience', workExperienceSchema);
