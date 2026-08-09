const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ===============================
// Generate Interview Question
// ===============================
const generateQuestion = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Role and difficulty are required.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an experienced technical interviewer.

Generate ONE interview question.

Role: ${role}

Difficulty: ${difficulty}

Rules:
- Return only ONE interview question.
- Do not include explanations.
- Do not include answers.
`;

    const result = await model.generateContent(prompt);

    const question = result.response.text();

    res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate interview question.",
    });
  }
};

// ===============================
// Evaluate Interview Answer
// ===============================
const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a senior technical interviewer.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and respond in this format only:

Score: X/10

Strengths:
- ...

Improvements:
- ...

Final Feedback:
...
`;

    const result = await model.generateContent(prompt);

    const feedback = result.response.text();

    res.status(200).json({
      success: true,
      feedback,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to evaluate answer.",
    });
  }
};

module.exports = {
  generateQuestion,
  evaluateAnswer,
};