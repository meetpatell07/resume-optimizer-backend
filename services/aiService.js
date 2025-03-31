const axios = require('axios');

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY; // Ensure this is set in your environment variables
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

// Define the model to use
const MODEL_NAME = 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free';

/**
 * Function to generate AI-generated content (resume, cover letter, etc.)
 * @param {string} prompt - The user prompt to generate content.
 * @returns {Promise<string>} - The generated AI response.
 */
async function generateAIContent(prompt) {
  try {
    if (!TOGETHER_API_KEY) {
      throw new Error('API key is missing. Set TOGETHER_API_KEY in environment variables.');
    }

    const requestBody = {
      model: MODEL_NAME,
      messages: [{ role: 'user', content: prompt }]
    };

    const response = await axios.post(TOGETHER_API_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response format from AI API.');
    }

  } catch (error) {
    console.error('Error generating AI content:', error.message || error.response?.data || error);
    return 'Error generating content. Please try again later.';
  }
}

/**
 * Generates an ATS-friendly resume based on the job details.
 * @param {Object} jobDetails - The job description and other details.
 * @returns {Promise<string>} - Generated resume text.
 */
async function generateResume(jobDetails) {
  const prompt = `
    Generate an ATS-friendly resume tailored for the following job:

    Job Title: ${jobDetails.jobTitle}
    Company: ${jobDetails.companyName}
    Responsibilities: ${jobDetails.responsibilities}
    Skills Required: ${jobDetails.skillsRequired}
    Qualifications: ${jobDetails.qualifications}
    Opportunities: ${jobDetails.opportunities}
    Other Details: ${jobDetails.otherDetails}

    The resume should be concise, well-structured, and ATS-optimized.
  `;
  return generateAIContent(prompt);
}

/**
 * Generates a cover letter based on the job details.
 * @param {Object} jobDetails - The job description and other details.
 * @returns {Promise<string>} - Generated cover letter text.
 */
async function generateCoverLetter(jobDetails) {
  const prompt = `
    Write a professional cover letter for the following job:

    Job Title: ${jobDetails.jobTitle}
    Company: ${jobDetails.companyName}
    Responsibilities: ${jobDetails.responsibilities}
    Skills Required: ${jobDetails.skillsRequired}
    Qualifications: ${jobDetails.qualifications}
    Opportunities: ${jobDetails.opportunities}
    Other Details: ${jobDetails.otherDetails}

    The cover letter should be engaging and tailored for this specific role.
  `;
  return generateAIContent(prompt);
}

/**
 * Generates a prompt for the AI based on the job description and user data, then calls generateAIContent.
 * @param {Object} jobDetails - The job description and other details for the prompt.
 * @param {Object} userData - The user's relevant data such as work experience, skills, etc.
 * @returns {Promise<string>} - Generated content from AI (e.g., resume, cover letter).
 */
async function generateTailoredContent(jobDetails, userData) {
  // Construct the prompt to generate the content
  const prompt = `
    Create a tailored document (resume, cover letter, or summary) for the following job position. Consider the user's experience and match it to the job details provided.

    Job Title: ${jobDetails.jobTitle}
    Company: ${jobDetails.companyName}
    Responsibilities: ${jobDetails.responsibilities}
    Skills Required: ${jobDetails.skillsRequired}
    Qualifications: ${jobDetails.qualifications}
    Opportunities: ${jobDetails.opportunities}
    Other Details: ${jobDetails.otherDetails}

    User Data: 
    - Work Experience: ${JSON.stringify(userData.workExperience)}
    - Projects: ${JSON.stringify(userData.projects)}
    - Education: ${JSON.stringify(userData.education)}
    - Skills: ${JSON.stringify(userData.skills)}
    - Volunteer Work: ${JSON.stringify(userData.volunteerWork)}
    - Technical Knowledge: ${JSON.stringify(userData.technicalKnowledge)}

    Please ensure that the generated content is ATS-optimized and tailored for this specific role. Focus on the most relevant experience and skills.
  `;

  // Pass the prompt to the generateAIContent method and return the result
  return generateAIContent(prompt);
}


module.exports = { generateAIContent, generateResume, generateCoverLetter, generateTailoredContent };
