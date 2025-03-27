const Project = require('../models/Project');

exports.addProject = async (userId, projectData) => {
  try {
    const project = new Project({ ...projectData, user: userId });
    return await project.save();
  } catch (error) {
    throw new Error('Error adding project: ' + error.message);
  }
};

exports.getProjectsByUserId = async (userId) => {
  try {
    return await Project.find({ user: userId });
  } catch (error) {
    throw new Error('Error fetching projects: ' + error.message);
  }
};

exports.updateProject = async (projectId, updateData) => {
  try {
    return await Project.findByIdAndUpdate(projectId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error updating project: ' + error.message);
  }
};

exports.deleteProject = async (projectId) => {
  try {
    return await Project.findByIdAndDelete(projectId);
  } catch (error) {
    throw new Error('Error deleting project: ' + error.message);
  }
};
