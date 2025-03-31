const educationService = require('../services/educationService');

exports.addEducation = async (req, res) => {
  try {


    const education = await educationService.addEducation(req.user.id, req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEducationByUserId = async (req, res) => {
  try {
    const educationData = await educationService.getEducationByUserId(req.user.id);
    res.status(200).json(educationData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const updatedEducation = await educationService.updateEducation(req.params.educationId, req.body);
    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    await educationService.deleteEducation(req.params.educationId);
    res.status(204).json({ message: 'Education record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
