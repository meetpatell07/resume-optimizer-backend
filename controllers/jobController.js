const Job = require('../models/job');
const { generateResume, generateCoverLetter } = require('../services/aiService');

const generateJobContent = async (req, res) => {
  try {
    const { jobDescription, companyName, jobTitle, responsibilities, skillsRequired, qualifications, opportunities, otherDetails } = req.body;

    if (!jobTitle || !companyName || !jobDescription) {
      return res.status(400).json({ error: 'Missing required fields: jobTitle, companyName, jobDescription' });
    }

    // Generate Resume & Cover Letter
    const resume = await generateResume(req.body);
    const coverLetter = await generateCoverLetter(req.body);

    // Save job details in the database
    const jobEntry = new Job({
      jobDescription,
      companyName,
      jobTitle,
      responsibilities,
      skillsRequired,
      qualifications,
      opportunities,
      otherDetails,
      generatedResume: resume,
      generatedCoverLetter: coverLetter,
    });

    // await jobEntry.save();
    // Send response immediately without saving

    res.status(200).json({ resume, coverLetter });

  } catch (error) {
    console.error('Error generating job content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { generateJobContent };
