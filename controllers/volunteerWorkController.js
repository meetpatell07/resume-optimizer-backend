const volunteerWorkService = require('../services/volunteerWorkService');

exports.addVolunteerWork = async (req, res) => {
  try {
    const volunteerWork = await volunteerWorkService.addVolunteerWork(req.userId, req.body);
    res.status(201).json(volunteerWork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVolunteerWorkByUserId = async (req, res) => {
  try {
    const volunteerWorks = await volunteerWorkService.getVolunteerWorkByUserId(req.userId);
    res.status(200).json(volunteerWorks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVolunteerWork = async (req, res) => {
  try {
    const updatedVolunteerWork = await volunteerWorkService.updateVolunteerWork(req.params.volunteerId, req.body);
    res.status(200).json(updatedVolunteerWork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVolunteerWork = async (req, res) => {
  try {
    await volunteerWorkService.deleteVolunteerWork(req.params.volunteerId);
    res.status(204).json({ message: 'Volunteer work deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
