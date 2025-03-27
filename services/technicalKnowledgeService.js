const TechnicalKnowledge = require('../models/TechnicalKnowledge');

exports.addTechnicalKnowledge = async (userId, techData) => {
  try {
    const techKnowledge = new TechnicalKnowledge({ ...techData, user: userId });
    return await techKnowledge.save();
  } catch (error) {
    throw new Error('Error adding technical knowledge: ' + error.message);
  }
};

exports.getTechnicalKnowledgeByUserId = async (userId) => {
  try {
    return await TechnicalKnowledge.find({ user: userId });
  } catch (error) {
    throw new Error('Error fetching technical knowledge: ' + error.message);
  }
};

exports.updateTechnicalKnowledge = async (techId, updateData) => {
  try {
    return await TechnicalKnowledge.findByIdAndUpdate(techId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating technical knowledge: ' + error.message);
  }
};

exports.deleteTechnicalKnowledge = async (techId) => {
  try {
    return await TechnicalKnowledge.findByIdAndDelete(techId);
  } catch (error) {
    throw new Error('Error deleting technical knowledge: ' + error.message);
  }
};
