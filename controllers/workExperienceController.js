const workExperienceService = require('../services/workExperienceService');

// Create work experience
exports.addWorkExperience = async (req, res) => {
  try {
    const workExperience = await workExperienceService.addWorkExperience(req.params.userId, req.body);
    res.status(201).json(workExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get work experience by user ID
exports.getWorkExperienceByUserId = async (req, res) => {
  try {
    const workExperiences = await workExperienceService.getWorkExperienceByUserId(req.params.userId);
    res.status(200).json(workExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update work experience by ID
exports.updateWorkExperience = async (req, res) => {
  try {
    const updatedWorkExperience = await workExperienceService.updateWorkExperience(req.params.workId, req.body);
    res.status(200).json(updatedWorkExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete work experience by ID
exports.deleteWorkExperience = async (req, res) => {
  try {
    await workExperienceService.deleteWorkExperience(req.params.workId);
    res.status(204).json({ message: 'Work experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
