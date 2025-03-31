const express = require('express');
const volunteerWorkController = require('../controllers/volunteerWorkController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add volunteer work
router.post('/', protect, volunteerWorkController.addVolunteerWork);

// Get volunteer work by user ID
router.get('/', protect, volunteerWorkController.getVolunteerWorkByUserId);

// Update volunteer work by ID
router.put('/:volunteerId', protect, volunteerWorkController.updateVolunteerWork);

// Delete volunteer work by ID
router.delete('/:volunteerId', protect, volunteerWorkController.deleteVolunteerWork);

module.exports = router;
