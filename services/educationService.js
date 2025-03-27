const Education = require('../models/Education');

exports.addEducation = async (userId, educationData) => {
  try {
    const education = new Education({ ...educationData, user: userId });
    return await education.save();
  } catch (error) {
    throw new Error('Error adding education: ' + error.message);
  }
};

exports.getEducationByUserId = async (userId) => {
  try {
    return await Education.find({ user: userId });
  } catch (error) {
    throw new Error('Error fetching education data: ' + error.message);
  }
};

exports.updateEducation = async (educationId, updateData) => {
  try {
    return await Education.findByIdAndUpdate(educationId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating education: ' + error.message);
  }
};

exports.deleteEducation = async (educationId) => {
  try {
    return await Education.findByIdAndDelete(educationId);
  } catch (error) {
    throw new Error('Error deleting education: ' + error.message);
  }
};
