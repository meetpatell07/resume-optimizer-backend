const projectService = require('../services/projectService');

exports.addProject = async (req, res) => {
  try {
    const newProject = await projectService.addProject(req.user.id, req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectsByUserId = async (req, res) => {
  try {
    const projects = await projectService.getProjectsByUserId(req.user.id);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await projectService.updateProject(req.params.projectId, req.body);
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await projectService.deleteProject(req.params.projectId);
    res.status(204).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
