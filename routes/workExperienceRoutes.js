const express = require('express');
const workExperienceController = require('../controllers/workExperienceController');
const router = express.Router();

// Create work experience
router.post('/:userId/work-experience', workExperienceController.addWorkExperience);

// Get work experience by user ID
router.get('/:userId/work-experience', workExperienceController.getWorkExperienceByUserId);

// Update work experience by ID
router.put('/:workId/work-experience', workExperienceController.updateWorkExperience);

// Delete work experience by ID
router.delete('/:workId/work-experience', workExperienceController.deleteWorkExperience);

module.exports = router;
