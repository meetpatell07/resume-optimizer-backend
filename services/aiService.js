// aiService.js
const axios = require('axios');

async function generateOptimizedResume(jobDescription, userData) {
  const apiKey = process.env.OPENAI_API_KEY;

  const prompt = `Generate an optimized resume for the following job description:\n${jobDescription}\n\nUser Details: ${userData}`;
  
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1000,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
}

module.exports = { generateOptimizedResume };
