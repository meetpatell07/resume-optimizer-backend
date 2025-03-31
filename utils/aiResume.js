const WorkExperience = require('../models/WorkExperience');
const Project = require('../models/Project');
const Education = require('../models/Education');
const Skills = require('../models/Skills');
const VolunteerWork = require('../models/VolunteerWork');
const TechnicalKnowledge = require('../models/TechnicalKnowledge');
const { generateAIContent, generateTailoredContent } = require('../services/aiService'); // AI integration

// Function to aggregate all user data from multiple models
const aggregateUserData = async (userId) => {
  try {
    console.log('User ID:', userId);  // Ensure the userId is correct and exists in the DB

    // Fetch all data related to the user
    const workExperience = await WorkExperience.find({ user: userId }).exec();
    const projects = await Project.find({ user: userId }).exec();
    const education = await Education.find({ user: userId }).exec();
    const skills = await Skills.find({ user: userId }).exec();
    const volunteerWork = await VolunteerWork.find({ user: userId }).exec();
    const technicalKnowledge = await TechnicalKnowledge.find({ user: userId }).exec();

    // Combine all the data into a single object
    const userData = {
      workExperience,
      projects,
      education,
      skills,
      volunteerWork,
      technicalKnowledge,
    };


    return userData;
  } catch (error) {
    console.error('Error aggregating user data:', error);
    throw new Error('Error fetching user data');
  }
};

// Function to generate tailored resume
const generateTailoredResume = async (jobDescription, userId) => {
  try {
    // Step 1: Aggregate all relevant user data from multiple models
    const userData = await aggregateUserData(userId);
    console.log('Aggregated User Data:', userData); // Debugging purposes


    // Step 2: Match user data with the job description (you can improve this matching logic)
    // const relevantExperience = matchDataWithJobDescription(userData, jobDescription);

    // console.log('Matched Relevant Experience:', relevantExperience); // Log matched relevant experience

    // Step 3: Generate the resume using AI with the matched data
    const resume = await generateTailoredContent(jobDescription, userData);

    return resume;
  } catch (error) {
    console.error('Error generating tailored resume:', error);
    throw new Error('Error generating tailored resume');
  }
};

// Function to match user data with the job description (this is a basic example)
const matchDataWithJobDescription = (userData, jobDescription) => {
  // Here, you could add logic to match specific job titles, skills, etc.
  const relevantExperience = [];

  // Match work experiences based on job title and description
  userData.workExperience.forEach((exp) => {
    if (jobDescription.description.includes(exp.jobTitle)) {
      relevantExperience.push(exp);
    }
  });

  // Match projects based on skills required in the job description
  userData.projects.forEach((project) => {
    if (jobDescription.skillsRequired.includes(project.technologies.join(', '))) {
      relevantExperience.push(project);
    }
  });

  // Match education or certifications if necessary
  userData.education.forEach((edu) => {
    if (jobDescription.skillsRequired.includes(edu.degree)) {
      relevantExperience.push(edu);
    }
  });

  return relevantExperience;
};

// Export functions
module.exports = { generateTailoredResume };
