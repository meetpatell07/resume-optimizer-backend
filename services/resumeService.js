const axios = require("axios");
const Resume = require("../models/Resume"); // Make sure Resume model exists
require("dotenv").config();

const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;
const TOGETHER_AI_ENDPOINT = "https://api.together.xyz/v1/chat/completions";

/**
 * Optimize resume based on job description using Llama
 * @param {string} userId - The user ID
 * @param {object} jobDetails - The job description
 * @returns {object} Optimized resume
 */
const optimizeResumeForJob = async (userId, jobDetails) => {
    try {
        // Fetch user's existing resume from MongoDB
        const resume = await Resume.findOne({ userId });
        if (!resume) {
            throw new Error("No resume found for optimization. Please upload a resume first.");
        }

        // Prepare prompt for Llama API
        const prompt = `
        You are an AI Resume Optimizer. Given a job description and a user's resume, improve the resume 
        to match the job requirements. Keep formatting intact.

        --- Job Description ---
        ${jobDetails}

        --- User's Resume ---
        ${resume.content}

        Provide an optimized resume.
        `;

        // Send request to Together.AI (Llama API)
        const response = await axios.post(
            TOGETHER_AI_ENDPOINT,
            {
                model: "meta-llama/Llama-3-8B", // Change this based on your preference
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${TOGETHER_AI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Extract optimized resume from response
        const optimizedResume = response.data.choices[0].message.content;

        // Save optimized resume back to MongoDB
        resume.optimizedContent = optimizedResume;
        await resume.save();

        return { success: true, optimizedResume };
    } catch (error) {
        console.error("Resume Optimization Error:", error);
        return { success: false, message: `Resume Generation Failed: ${error.message}` };
    }
};

module.exports = { optimizeResumeForJob };
