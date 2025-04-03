const axios = require('axios');


const HF_API_KEY = process.env.HF_API_KEY; // Store this securely in environment variables
const HF_API_URL = process.env.HF_API_URL;

// const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY; // Ensure this is set in your environment variables
// const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

// Define the model to use
const MODEL_NAME = 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free';

const generateAIContent = async (jobDescription, relevantExperience) => {
  try {
    // Prepare the prompt for AI
    const prompt = `Generate a tailored resume based on the following job description and user experience. 
                    Job Description: ${jobDescription}
                    User Experience: ${JSON.stringify(relevantExperience)}`;

                    const response = await axios.post(HF_API_URL, 
                      { inputs: prompt }, 
                      {
                        headers: {
                          'Authorization': `Bearer ${HF_API_KEY}`,
                          'Content-Type': 'application/json'
                        }
                      }
                    );

    // Return the generated resume content from the response
    // return response.data.choices[0].text; // Ensure this is the correct path based on API response format
    return response.data[0].generated_text; 

  } catch (error) {
    console.error('Error generating AI content:', error);
    throw new Error('Error generating AI content');
  }
};

module.exports = { generateAIContent };
