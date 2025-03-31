const express = require('express');
const workExperienceController = require('../controllers/workExperienceController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT


// Create work experience
router.post('/', protect, workExperienceController.addWorkExperience);

// Get work experience by user ID
router.get('/',protect, workExperienceController.getWorkExperienceByUserId);

// Update work experience by ID
router.put('/:workId/work-experience',protect, workExperienceController.updateWorkExperience);

// Delete work experience by ID
router.delete('/:workId/work-experience', protect, workExperienceController.deleteWorkExperience);

module.exports = router;
