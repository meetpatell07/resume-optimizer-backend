const express = require('express');
const technicalKnowledgeController = require('../controllers/technicalKnowledgeController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT

// Add technical knowledge
router.post('/', authMiddleware, technicalKnowledgeController.addTechnicalKnowledge);

// Get technical knowledge by user ID
router.get('/', authMiddleware, technicalKnowledgeController.getTechnicalKnowledgeByUserId);

// Update technical knowledge by ID
router.put('/:techId', authMiddleware, technicalKnowledgeController.updateTechnicalKnowledge);

// Delete technical knowledge by ID
router.delete('/:techId', authMiddleware, technicalKnowledgeController.deleteTechnicalKnowledge);

module.exports = router;
