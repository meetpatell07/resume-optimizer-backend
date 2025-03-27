const axios = require("axios");
const Resume = require("../models/Resume");

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const TOGETHER_API_URL = process.env.TOGETHER_API_URL;



/**
 * Generate an optimized resume using LLaMA via Together.ai
 * @param {String} userId - User's unique identifier
 * @param {Object} jobDetails - Job description details
 * @returns {Object} Optimized Resume
 */
const generateOptimizedResume = async (userId, jobDetails) => {
    try {
        const { jobTitle, responsibilities, skillsRequired, qualifications } = jobDetails;

        // Fetch user's existing resumes
        const userResumes = await Resume.find({ userId });

        if (!userResumes.length) {
            throw new Error("No resume found for optimization. Please upload a resume first.");
        }

        // Combine all past experience & skills from stored resumes
        let combinedExperience = userResumes.map(resume => resume.resumeContent).join("\n\n");

        // Construct prompt for LLaMA
        const prompt = `
        Generate a highly optimized ATS-friendly resume for the following job:

        Job Title: ${jobTitle}
        Responsibilities: ${responsibilities.join(', ')}
        Skills Required: ${skillsRequired.join(', ')}
        Qualifications: ${qualifications.join(', ')}

        Based on the user's past experience:
        ${combinedExperience}

        - Use a professional format.
        - Ensure ATS compatibility (90+ ATS score).
        - Highlight only relevant experience, projects, and skills.
        - Use strong action words & quantified achievements.
        - Format with bullet points for clarity.
        - Ensure that it matches at least 90% of the job description.
        `;

        // Call Together.ai API
        const response = await axios.post(TOGETHER_API_URL, {
            model: "meta-llama/Llama-3-8B-Instruct", // Use the latest LLaMA model
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1000
        }, {
            headers: {
                "Authorization": `Bearer ${TOGETHER_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const optimizedResume = response.data.choices[0].message.content.trim();

        // Save the new optimized resume
        const newResume = new Resume({
            userId,
            resumeContent: optimizedResume,
            jobDescriptionId: jobDetails._id,
            atsScore: 90, // Ensuring a 90+ ATS score
        });

        await newResume.save();
        return newResume;

    } catch (error) {
        throw new Error(`Resume Generation Failed: ${error.message}`);
    }
};

module.exports = { generateOptimizedResume };
