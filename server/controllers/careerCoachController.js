const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// AI CAREER COACH
// ==========================================

const askCareerCoach = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const prompt = `
You are an expert AI Career Coach.

Help a college student with:

- Career planning
- Internships
- Placements
- Technical skills
- Projects
- Resume preparation
- Job preparation
- Interview preparation
- Learning roadmaps

User Question:

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

- answer must directly answer the user's question.
- roadmap must contain clear career steps.
- skillsToLearn must contain useful skills.
- projectSuggestions must contain relevant project ideas.
- nextSteps must contain specific actions the user can take next.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      result = {
        answer: text,
        roadmap: [],
        skillsToLearn: [],
        projectSuggestions: [],
        nextSteps: [],
      };
    }

    return res.status(200).json({
      success: true,
      message: "Career advice generated successfully.",
      data: result,
    });

  } catch (error) {
    console.error("Career Coach Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get AI career advice.",
      error: error.message,
    });
  }
};

module.exports = {
  askCareerCoach,
};