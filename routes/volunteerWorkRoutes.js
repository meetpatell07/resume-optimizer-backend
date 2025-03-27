const express = require('express');
const volunteerWorkController = require('../controllers/volunteerWorkController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add volunteer work
router.post('/', authMiddleware, volunteerWorkController.addVolunteerWork);

// Get volunteer work by user ID
router.get('/', authMiddleware, volunteerWorkController.getVolunteerWorkByUserId);

// Update volunteer work by ID
router.put('/:volunteerId', authMiddleware, volunteerWorkController.updateVolunteerWork);

// Delete volunteer work by ID
router.delete('/:volunteerId', authMiddleware, volunteerWorkController.deleteVolunteerWork);

module.exports = router;
