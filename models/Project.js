const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectName: { type: String, required: true },
  description: { type: String },
  technologiesUsed: { type: String },
  outcomes: { type: String },
});

module.exports = mongoose.model('Project', projectSchema);
