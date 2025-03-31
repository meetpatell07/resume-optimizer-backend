const mongoose = require('mongoose');

const technicalKnowledgeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    programmingLanguages: { type: [String] },
    toolsAndFrameworks: { type: [String] },
    certifications: { type: [String] },
    otherDetails: { type: String },

});

module.exports = mongoose.model('TechnicalKnowledge', technicalKnowledgeSchema);
