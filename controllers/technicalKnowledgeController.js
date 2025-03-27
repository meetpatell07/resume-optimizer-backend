const technicalKnowledgeService = require('../services/technicalKnowledgeService');

exports.addTechnicalKnowledge = async (req, res) => {
  try {
    const newTechKnowledge = await technicalKnowledgeService.addTechnicalKnowledge(req.userId, req.body);
    res.status(201).json(newTechKnowledge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTechnicalKnowledgeByUserId = async (req, res) => {
  try {
    const technicalKnowledge = await technicalKnowledgeService.getTechnicalKnowledgeByUserId(req.userId);
    res.status(200).json(technicalKnowledge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTechnicalKnowledge = async (req, res) => {
  try {
    const updatedTechKnowledge = await technicalKnowledgeService.updateTechnicalKnowledge(req.params.techId, req.body);
    res.status(200).json(updatedTechKnowledge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTechnicalKnowledge = async (req, res) => {
  try {
    await technicalKnowledgeService.deleteTechnicalKnowledge(req.params.techId);
    res.status(204).json({ message: 'Technical knowledge deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
