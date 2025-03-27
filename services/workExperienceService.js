const WorkExperience = require('../models/WorkExperience');

// Create work experience
exports.addWorkExperience = async (userId, workData) => {
  try {
    const workExperience = new WorkExperience({ ...workData, user: userId });
    return await workExperience.save();
  } catch (error) {
    throw new Error('Error adding work experience: ' + error.message);
  }
};

// Get work experience by user ID
exports.getWorkExperienceByUserId = async (userId) => {
  try {
    return await WorkExperience.find({ user: userId });
  } catch (error) {
    throw new Error('Error fetching work experience: ' + error.message);
  }
};

// Update work experience by ID
exports.updateWorkExperience = async (workId, updateData) => {
  try {
    return await WorkExperience.findByIdAndUpdate(workId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating work experience: ' + error.message);
  }
};

// Delete work experience by ID
exports.deleteWorkExperience = async (workId) => {
  try {
    return await WorkExperience.findByIdAndDelete(workId);
  } catch (error) {
    throw new Error('Error deleting work experience: ' + error.message);
  }
};
