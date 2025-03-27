const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add project
router.post('/', authMiddleware, projectController.addProject);

// Get projects by user ID
router.get('/', authMiddleware, projectController.getProjectsByUserId);

// Update project by ID
router.put('/:projectId', authMiddleware, projectController.updateProject);

// Delete project by ID
router.delete('/:projectId', authMiddleware, projectController.deleteProject);

module.exports = router;
