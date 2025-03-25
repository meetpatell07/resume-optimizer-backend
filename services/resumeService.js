const fs = require('fs');
const path = require('path');
const Resume = require('../models/Resume');
const JobDescription = require('../models/JobDescription'); // Assuming job details are stored
const { analyzeResume, optimizeResumeForATS } = require('../utils/resumeAI');

// 🔹 Save Resume to Database
const saveResume = async (file, userId) => {
  try {
    const newResume = new Resume({
      userId,
      filePath: file.path,
      fileName: file.originalname,
    });

    await newResume.save();
    return newResume;
  } catch (error) {
    throw new Error('Failed to save resume.');
  }
};

// 🔹 Optimize Resume Based on Job Description
const optimizeResume = async (resumeId, jobId) => {
  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) throw new Error('Resume not found.');

    const jobDetails = await JobDescription.findById(jobId);
    if (!jobDetails) throw new Error('Job details not found.');

    // Extract text from resume (Assuming a function extracts text from the uploaded file)
    const resumeText = fs.readFileSync(resume.filePath, 'utf-8');

    // Process optimization using AI
    const optimizedText = await optimizeResumeForATS(resumeText, jobDetails.description);

    resume.optimizedText = optimizedText;
    await resume.save();

    return resume;
  } catch (error) {
    throw new Error(`Error optimizing resume: ${error.message}`);
  }
};

// 🔹 Fetch Optimized Resume
const getOptimizedResume = async (resumeId) => {
  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) throw new Error('Optimized resume not found.');

    return resume;
  } catch (error) {
    throw new Error('Failed to fetch optimized resume.');
  }
};

module.exports = {
  saveResume,
  optimizeResume,
  getOptimizedResume,
};
