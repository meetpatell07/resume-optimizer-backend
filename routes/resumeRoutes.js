// routes/resumeRoutes.js
const express = require('express');
const { optimizeResume } = require('../controllers/resumeController');

const router = express.Router();

// Route to optimize a resume based on job description
router.post('/optimize', optimizeResume);

module.exports = router;
