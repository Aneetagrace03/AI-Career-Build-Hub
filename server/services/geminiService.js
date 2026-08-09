const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// AI RESUME ANALYZER
// ==========================================

const analyzeResume = async (resumeText) => {
  try {
    const prompt = `
You are an expert ATS (Applicant Tracking System) and professional Career Coach.

Analyze the following resume carefully.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT use code blocks.
Do NOT add any text outside the JSON.

Return exactly this structure:

{
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "interviewQuestions": []
}

Rules:

- atsScore must be a number between 0 and 100.
- summary should briefly describe the candidate.
- strengths should contain important strengths found in the resume.
- weaknesses should contain areas that need improvement.
- missingSkills should contain relevant skills that appear to be missing.
- suggestions should contain practical improvements for the resume.
- interviewQuestions should contain relevant interview questions based on the resume.

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Resume Error:", error);
    throw error;
  }
};

// ==========================================
// AI CAREER COACH
// ==========================================

const careerCoach = async (question) => {
  try {
    const prompt = `
You are an expert AI Career Coach.

Help a college student with career planning, internships,
placements, technical skills, projects, interviews and job preparation.

The student's question is:

${question}

Give practical, realistic and actionable advice.

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use code blocks.
Do NOT add any text outside the JSON.

Return exactly this structure:

{
  "answer": "",
  "roadmap": [],
  "skillsToLearn": [],
  "projectSuggestions": [],
  "nextSteps": []
}

Rules:

- answer should directly answer the student's question.
- roadmap should contain clear career steps.
- skillsToLearn should contain useful technical or professional skills.
- projectSuggestions should contain relevant project ideas.
- nextSteps should contain specific actions the student can take next.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Career Coach Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
  careerCoach,
};