const express = require('express');
const skillController = require('../controllers/skillController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add skill
router.post('/', protect, skillController.addSkill);

// Get skills by user ID
router.get('/', protect, skillController.getSkillsByUserId);

// Update skill by ID
router.put('/:skillId', protect, skillController.updateSkill);

// Delete skill by ID
router.delete('/:skillId', protect, skillController.deleteSkill);

module.exports = router;
