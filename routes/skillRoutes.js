const express = require('express');
const skillController = require('../controllers/skillController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add skill
router.post('/', authMiddleware, skillController.addSkill);

// Get skills by user ID
router.get('/', authMiddleware, skillController.getSkillsByUserId);

// Update skill by ID
router.put('/:skillId', authMiddleware, skillController.updateSkill);

// Delete skill by ID
router.delete('/:skillId', authMiddleware, skillController.deleteSkill);

module.exports = router;
