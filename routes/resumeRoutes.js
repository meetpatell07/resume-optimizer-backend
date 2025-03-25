// routes/resumeRoutes.js
const express = require('express');
const { optimizeResume } = require('../controllers/resumeController');

const router = express.Router();

// Route to optimize a resume based on job description
router.post('/optimize', optimizeResume);

module.exports = router;

// const express = require('express');
// const multer = require('multer');
// const { uploadResume, optimizeResume, getOptimizedResume } = require('../controllers/resumeController');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // File Storage

// // 🔹 Upload Resume
// router.post('/upload', upload.single('resume'), uploadResume);

// // 🔹 Optimize Resume (Based on Job ID)
// router.post('/optimize/:jobId', optimizeResume);

// // 🔹 Fetch Optimized Resume
// router.get('/:resumeId', getOptimizedResume);

// module.exports = router;

