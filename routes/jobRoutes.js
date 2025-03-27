const express = require('express');
const { generateJobContent } = require('../controllers/jobController');

const router = express.Router();

// POST request to generate resume and cover letter
router.post('/generate', generateJobContent);

module.exports = router;
