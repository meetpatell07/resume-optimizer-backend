function calculateAtsScore(jobDescription, resumeContent) {
    const jobKeywords = jobDescription.split(' ').map(word => word.toLowerCase());
    const resumeWords = resumeContent.split(' ').map(word => word.toLowerCase());
  
    let matchingKeywords = 0;
  
    jobKeywords.forEach(keyword => {
      if (resumeWords.includes(keyword)) {
        matchingKeywords++;
      }
    });
  
    const atsScore = (matchingKeywords / jobKeywords.length) * 100;
    return atsScore;
}
  
module.exports = { calculateAtsScore };
  