const express = require('express');
const { generateJobContent, generateResumeAI } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT


const router = express.Router();

// POST request to generate resume and cover letter
router.post('/generate', generateJobContent);

// POST request to generate resume
router.post('/generate-resume-ai', protect, generateResumeAI );

module.exports = router;
