const workExperienceService = require('../services/workExperienceService');

// Create work experience
exports.addWorkExperience = async (req, res) => {
  try {
    // Extract userId from req.user (set by verifyToken middleware)
    const userId = req.user.id;

    // Call service to add work experience with the userId
    const workExperience = await workExperienceService.addWorkExperience(userId, req.body);
    res.status(201).json(workExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get work experience by user ID
exports.getWorkExperienceByUserId = async (req, res) => {
  try {
    // Extract userId from req.user (set by verifyToken middleware)
    const userId = req.user.id;

    // Call service to get work experience by userId
    const workExperiences = await workExperienceService.getWorkExperienceByUserId(userId);
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
