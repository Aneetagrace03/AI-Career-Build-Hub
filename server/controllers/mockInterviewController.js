const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// START MOCK INTERVIEW
// ==========================================

const startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Role and difficulty are required.",
      });
    }

    const prompt = `
You are an expert technical interviewer.

Generate ONE interview question for a mock interview.

Job Role: ${role}

Difficulty: ${difficulty}

Return ONLY valid JSON.

Do not use markdown.
Do not use code blocks.
Do not add any explanation outside JSON.

Return exactly:

{
  "question": "",
  "category": "",
  "difficulty": ""
}

The question must be relevant to the selected job role and difficulty.
`;

    console.log("Starting mock interview...");
    console.log("Role:", role);
    console.log("Difficulty:", difficulty);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    console.log("Gemini response:", text);

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      console.log("Gemini returned non-JSON response.");

      result = {
        question: text,
        category: "General",
        difficulty: difficulty,
      };
    }

    return res.status(200).json({
      success: true,
      message: "Interview question generated successfully.",
      data: result,
    });

  } catch (error) {
    console.error("================================");
    console.error("MOCK INTERVIEW ERROR");
    console.error("================================");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate interview question.",
    });
  }
};


// ==========================================
// EVALUATE ANSWER
// ==========================================

const evaluateAnswer = async (req, res) => {
  try {
    const {
      role,
      difficulty,
      question,
      answer,
    } = req.body;

    if (!role || !question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Role, question and answer are required.",
      });
    }

    const prompt = `
You are an expert technical interviewer and career coach.

Evaluate the candidate's answer.

Job Role:
${role}

Difficulty:
${difficulty || "Medium"}

Interview Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON.

Do not use markdown.
Do not use code blocks.
Do not add any text outside JSON.

Return exactly:

{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "improvements": [],
  "idealAnswer": ""
}

Rules:

- score must be between 0 and 100.
- feedback should explain the quality of the answer.
- strengths should describe what the candidate did well.
- improvements should explain what needs improvement.
- idealAnswer should provide a strong example answer.
`;

    console.log("Evaluating interview answer...");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    console.log("Evaluation response:", text);

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      result = {
        score: 0,
        feedback: text,
        strengths: [],
        improvements: [],
        idealAnswer: "",
      };
    }

    return res.status(200).json({
      success: true,
      message: "Answer evaluated successfully.",
      data: result,
    });

  } catch (error) {
    console.error("================================");
    console.error("EVALUATION ERROR");
    console.error("================================");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to evaluate answer.",
    });
  }
};


module.exports = {
  startInterview,
  evaluateAnswer,
};