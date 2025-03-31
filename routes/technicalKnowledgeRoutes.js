const express = require('express');
const technicalKnowledgeController = require('../controllers/technicalKnowledgeController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add technical knowledge
router.post('/', protect, technicalKnowledgeController.addTechnicalKnowledge);

// Get technical knowledge by user ID
router.get('/', protect, technicalKnowledgeController.getTechnicalKnowledgeByUserId);

// Update technical knowledge by ID
router.put('/:techId', protect, technicalKnowledgeController.updateTechnicalKnowledge);

// Delete technical knowledge by ID
router.delete('/:techId', protect, technicalKnowledgeController.deleteTechnicalKnowledge);

module.exports = router;
