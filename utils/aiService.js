const axios = require('axios');

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY; // Ensure this is set in your environment variables
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

// Define the model to use
const MODEL_NAME = 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free';

const generateAIContent = async (jobDescription, relevantExperience) => {
  try {
    // Prepare the prompt for AI
    const prompt = `Generate a tailored resume based on the following job description and user experience. 
                    Job Description: ${jobDescription}
                    User Experience: ${JSON.stringify(relevantExperience)}`;

    // Call the Together API to generate resume content
    const response = await axios.post(TOGETHER_API_URL, {
      model: MODEL_NAME,  // Specify the model name for the API
      prompt: prompt,     // Pass the generated prompt
      max_tokens: 500,    // Set the max tokens for the response (can adjust based on your needs)
      temperature: 0.7,   // Set the randomness of the response
      top_p: 1,           // Set the diversity of the generated response
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`, // Authorization with your API key
        'Content-Type': 'application/json',            // Set content type to JSON
      },
    });

    // Return the generated resume content from the response
    return response.data.choices[0].text; // Ensure this is the correct path based on API response format
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw new Error('Error generating AI content');
  }
};

module.exports = { generateAIContent };
