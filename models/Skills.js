const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  technicalSkills: { type: [String] },
  softSkills: { type: [String] },
});

module.exports = mongoose.model('Skills', skillsSchema);
