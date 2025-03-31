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
  // Construct the optimized prompt
  const prompt = `
    You are an expert ATS-optimized resume writer with a deep understanding of industry best practices, keyword optimization, and job market trends. Your task is to generate a **highly tailored** and **ATS-compliant** resume that aligns **perfectly** with the provided job description. The final output must be **concise, impactful, and formatted to achieve an ATS score above 90**.

    --- **Job Description Details** ---
    **Job Title:** ${jobDetails.jobTitle}
    **Company:** ${jobDetails.companyName}
    **Key Responsibilities:** ${jobDetails.responsibilities}
    **Skills Required:** ${jobDetails.skillsRequired}
    **Qualifications:** ${jobDetails.qualifications}
    **Opportunities & Career Growth:** ${jobDetails.opportunities}
    **Additional Details:** ${jobDetails.otherDetails}

    --- **User Profile & Experience** ---
    **Contact Information:** ${JSON.stringify(userData.userInfo)}
    **Work Experience:** ${JSON.stringify(userData.workExperience)}
    **Projects:** ${JSON.stringify(userData.projects)}
    **Education:** ${JSON.stringify(userData.education)}
    **Skills:** ${JSON.stringify(userData.skills)}
    **Volunteer Work:** ${JSON.stringify(userData.volunteerWork)}
    **Technical Knowledge:** ${JSON.stringify(userData.technicalKnowledge)}

     --- **Instructions for Resume Generation** ---

    🚀 **Step 1: Identify Relevant Experience**
    - **Analyze the job description carefully** and extract key skills, required experience, and job responsibilities.
    - **Scan the user's past experiences, projects, and skills** and filter out **ONLY** those that are **most relevant** to this job.
    - **Ignore unrelated experiences** (e.g., security, retail, etc., if applying for a developer role).  
    - Prioritize **relevant projects, work experience, and skills** that directly match the **job title**.

    
    🔥 **Step 2: Optimize Work Experience & Bullet Points**
    - Rewrite each bullet point with **strong action verbs**, measurable achievements, and **quantifiable results**.
    - Ensure the **most relevant experiences appear first** in the resume.
    - Use **impact-driven phrasing** such as:
      - ✅ "Developed and deployed a full-stack application using React.js and Node.js, improving process efficiency by 40%."
      - ✅ "Implemented API optimizations that reduced server response time by 25%."
      - ❌ (Avoid generic phrases like "Worked on a project" or "Familiar with JavaScript.")

       🎯 **Step 3: Enhance Skills Section**
    - Extract and **match skills exactly as they appear** in the job description.
    - Prioritize **hard skills and technical proficiencies** over generic soft skills.
    - List **certifications, tools, and frameworks** mentioned in the job post.

    📄 **Step 4: Professional Formatting**
    - Use a **clean, ATS-friendly layout** without tables, columns, or images.
    - Ensure **consistent formatting** with clear headings.
    - Maintain a **one-page or two-page format** (depending on experience).

    ✅ **Final Deliverable:**  
    - A **highly tailored resume** focusing only on relevant experience.  
    - Optimized for **ATS scoring 90+** with proper **keyword targeting**.  
    - Uses **quantifiable achievements and powerful action verbs**.  
    - Easy to read, **professionally formatted, and recruiter-friendly**.  

    **Goal:** Deliver a **flawless, ATS-optimized resume** that ensures the highest possible matching score while maintaining professionalism and readability.

    Now, generate the **final optimized resume** based on these instructions.
  `;

  // Pass the optimized prompt to AI for content generation
  return generateAIContent(prompt);
}


module.exports = { generateAIContent, generateResume, generateCoverLetter, generateTailoredContent };
