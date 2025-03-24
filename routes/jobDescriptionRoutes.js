// routes/jobDescriptionRoutes.js
const express = require('express');
const { createJobDescription, getJobDescription } = require('../controllers/jobDescriptionController');

const router = express.Router();

// Route to create a new job description
router.post('/', createJobDescription);

// Route to get a job description by ID
router.get('/:id', getJobDescription);

module.exports = router;
