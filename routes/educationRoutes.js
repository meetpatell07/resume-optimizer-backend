const express = require('express');
const educationController = require('../controllers/educationController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add education
router.post('/', protect, educationController.addEducation);

// Get education by user ID
router.get('/', protect, educationController.getEducationByUserId);

// Update education by ID
router.put('/:educationId', protect, educationController.updateEducation);

// Delete education by ID
router.delete('/:educationId', protect, educationController.deleteEducation);

module.exports = router;
