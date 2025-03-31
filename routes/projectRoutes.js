const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add project
router.post('/', protect, projectController.addProject);

// Get projects by user ID
router.get('/', protect, projectController.getProjectsByUserId);

// Update project by ID
router.put('/:projectId', protect, projectController.updateProject);

// Delete project by ID
router.delete('/:projectId', protect, projectController.deleteProject);

module.exports = router;
