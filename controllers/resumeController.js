// controllers/resumeController.js
const Resume = require('../models/Resume');
const JobDescription = require('../models/JobDescription');
const { generateOptimizedResume } = require('../services/aiService');
const { calculateAtsScore } = require('../services/atsScore');

async function optimizeResume(req, res) {
  const { jobDescriptionId, userData } = req.body;

  try {
    const jobDescription = await JobDescription.findById(jobDescriptionId);
    if (!jobDescription) {
      return res.status(404).json({ error: 'Job description not found' });
    }

    const optimizedResume = await generateOptimizedResume(jobDescription.description, userData);
    const atsScore = calculateAtsScore(jobDescription.description, optimizedResume);

    const newResume = new Resume({
      userName: userData.userName,
      resumeContent: optimizedResume,
      jobDescriptionId,
      atsScore,
    });

    await newResume.save();

    res.status(200).json({
      message: 'Resume optimized successfully',
      optimizedResume,
      atsScore,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error optimizing resume' });
  }
}

module.exports = { optimizeResume };
