const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  additionalInfo: { type: String },
});

module.exports = mongoose.model('Education', educationSchema);
