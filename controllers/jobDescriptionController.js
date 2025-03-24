// controllers/jobDescriptionController.js
const JobDescription = require('../models/JobDescription');

async function createJobDescription(req, res) {
  const { title, description, skillsRequired, responsibilities, opportunities } = req.body;

  try {
    const jobDescription = new JobDescription({
      title,
      description,
      skillsRequired,
      responsibilities,
      opportunities,
    });

    await jobDescription.save();
    res.status(201).json({ message: 'Job description created successfully', jobDescription });
  } catch (error) {
    res.status(500).json({ error: 'Error creating job description' });
  }
}

async function getJobDescription(req, res) {
  const { id } = req.params;

  try {
    const jobDescription = await JobDescription.findById(id);
    if (!jobDescription) {
      return res.status(404).json({ error: 'Job description not found' });
    }
    res.status(200).json(jobDescription);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job description' });
  }
}

module.exports = { createJobDescription, getJobDescription };
