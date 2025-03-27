const skillService = require('../services/skillService');

exports.addSkill = async (req, res) => {
  try {
    const newSkill = await skillService.addSkill(req.userId, req.body);
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSkillsByUserId = async (req, res) => {
  try {
    const skills = await skillService.getSkillsByUserId(req.userId);
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const updatedSkill = await skillService.updateSkill(req.params.skillId, req.body);
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await skillService.deleteSkill(req.params.skillId);
    res.status(204).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
