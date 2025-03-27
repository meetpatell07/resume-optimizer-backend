const Skill = require('../models/Skill');

exports.addSkill = async (userId, skillData) => {
  try {
    const newSkill = new Skill({ ...skillData, user: userId });
    return await newSkill.save();
  } catch (error) {
    throw new Error('Error adding skill: ' + error.message);
  }
};

exports.getSkillsByUserId = async (userId) => {
  try {
    return await Skill.find({ user: userId });
  } catch (error) {
    throw new Error('Error fetching skills: ' + error.message);
  }
};

exports.updateSkill = async (skillId, updateData) => {
  try {
    return await Skill.findByIdAndUpdate(skillId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating skill: ' + error.message);
  }
};

exports.deleteSkill = async (skillId) => {
  try {
    return await Skill.findByIdAndDelete(skillId);
  } catch (error) {
    throw new Error('Error deleting skill: ' + error.message);
  }
};
