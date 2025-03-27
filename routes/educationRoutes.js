const express = require('express');
const educationController = require('../controllers/educationController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add education
router.post('/', authMiddleware, educationController.addEducation);

// Get education by user ID
router.get('/', authMiddleware, educationController.getEducationByUserId);

// Update education by ID
router.put('/:educationId', authMiddleware, educationController.updateEducation);

// Delete education by ID
router.delete('/:educationId', authMiddleware, educationController.deleteEducation);

module.exports = router;
