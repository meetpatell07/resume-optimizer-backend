const mongoose = require('mongoose');

const volunteerWorkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organizationName: { type: String, required: true },
  role: { type: String, required: true },
  contributions: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
});

module.exports = mongoose.model('VolunteerWork', volunteerWorkSchema);
