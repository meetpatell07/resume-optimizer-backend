// controllers/resumeController.js
const Resume = require('../models/Resume');
const JobDescription = require('../models/job');
// const { generateOptimizedResume } = require('../services/aiService');
const { calculateAtsScore } = require('../services/atsScore');
const resumeService = require('../services/resumeService'); // Ensure correct path

// 🔹 Upload Resume
// exports.uploadResume = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

//     const userId = req.body.userId || "defaultUser"; // Replace with actual user authentication
//     const resume = await resumeService.saveResume(req.file, userId);

//     res.status(201).json({ message: 'Resume uploaded successfully.', resume });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// async function optimizeResume(req, res) {
//   const { jobDescriptionId, userData } = req.body;

//   try {
//     const jobDescription = await JobDescription.findById(jobDescriptionId);
//     if (!jobDescription) {
//       return res.status(404).json({ error: 'Job description not found' });
//     }

//     const optimizedResume = await generateOptimizedResume(jobDescription.description, userData);
//     const atsScore = calculateAtsScore(jobDescription.description, optimizedResume);

//     const newResume = new Resume({
//       userName: userData.userName,
//       resumeContent: optimizedResume,
//       jobDescriptionId,
//       atsScore,
//     });

//     await newResume.save();

//     res.status(200).json({
//       message: 'Resume optimized successfully',
//       optimizedResume,
//       atsScore,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Error optimizing resume' });
//   }
// }

// 🔹 Fetch Optimized Resume
// exports.getOptimizedResume = async (req, res) => {
//   try {
//     const { resumeId } = req.params;

//     const resume = await resumeService.getOptimizedResume(resumeId);

//     res.status(200).json({ optimizedResume: resume });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
  
// };

const generateOptimizedResume = async (req, res) => {
  try {
      const { userId, jobDetails } = req.body;
      const optimizedResume = await resumeService.optimizeResumeForJob(userId, jobDetails);
      res.status(200).json({ success: true, resume: optimizedResume });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generateOptimizedResume };
