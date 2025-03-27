const VolunteerWork = require('../models/VolunteerWork');

exports.addVolunteerWork = async (userId, volunteerData) => {
  try {
    const volunteerWork = new VolunteerWork({ ...volunteerData, user: userId });
    return await volunteerWork.save();
  } catch (error) {
    throw new Error('Error adding volunteer work: ' + error.message);
  }
};

exports.getVolunteerWorkByUserId = async (userId) => {
  try {
    return await VolunteerWork.find({ user: userId });
  } catch (error) {
    throw new Error('Error fetching volunteer work: ' + error.message);
  }
};

exports.updateVolunteerWork = async (volunteerId, updateData) => {
  try {
    return await VolunteerWork.findByIdAndUpdate(volunteerId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating volunteer work: ' + error.message);
  }
};

exports.deleteVolunteerWork = async (volunteerId) => {
  try {
    return await VolunteerWork.findByIdAndDelete(volunteerId);
  } catch (error) {
    throw new Error('Error deleting volunteer work: ' + error.message);
  }
};
