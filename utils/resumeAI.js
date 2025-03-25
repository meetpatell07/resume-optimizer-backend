const OpenAI = require('openai'); 
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔹 Optimize Resume for ATS
exports.optimizeResumeForATS = async (resumeText, jobDescription) => {
  const prompt = `
  Given the following job description: 
  ${jobDescription}

  And this resume:
  ${resumeText}

  Generate a tailored resume that maximizes ATS compatibility while aligning with the job description. Ensure correct formatting, key skills, and industry-relevant keywords.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Optimization Error:", error);
    throw new Error('Failed to optimize resume.');
  }
};
