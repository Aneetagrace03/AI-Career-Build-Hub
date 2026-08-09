const { GoogleGenAI } = require("@google/genai");
const Roadmap = require("../models/Roadmap");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// GENERATE AI ROADMAP
// POST /api/roadmap/generate
// ==========================================

const generateRoadmap = async (req, res) => {
  try {
    const { career, level } = req.body;

    if (!career || !level) {
      return res.status(400).json({
        success: false,
        message: "Career and level are required.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API Key is missing in .env",
      });
    }

    const prompt = `
You are an expert career mentor.

Create a professional and detailed learning roadmap.

Career Goal:
${career}

Current Skill Level:
${level}

Create a practical 6-month roadmap.

Include:

1. Month-wise learning plan
2. Topics to learn each month
3. Mini projects
4. One major project
5. Free learning resources
6. Useful YouTube channels
7. Relevant certifications
8. Coding practice websites
9. Interview preparation
10. Expected skills after completion

Make the roadmap suitable for a college student preparing for internships and placements.

Return the roadmap in clean Markdown format.
`;

    console.log("Generating roadmap...");
    console.log("Career:", career);
    console.log("Level:", level);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const roadmap = response.text;

    if (!roadmap) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned an empty response.",
      });
    }

    const savedRoadmap = await Roadmap.create({
      user: req.user._id,
      career,
      level,
      roadmap,
    });

    return res.status(201).json({
      success: true,
      message: "Roadmap generated successfully.",
      roadmap: savedRoadmap.roadmap,
      id: savedRoadmap._id,
    });

  } catch (error) {
    console.error("========== ROADMAP ERROR ==========");
    console.error(error);
    console.error("===================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate roadmap.",
    });
  }
};

// ==========================================
// GET ROADMAP HISTORY
// GET /api/roadmap/history
// ==========================================

const getRoadmapHistory = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      roadmaps,
    });

  } catch (error) {
    console.error("Roadmap History Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE ROADMAP
// DELETE /api/roadmap/:id
// ==========================================

const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    if (
      roadmap.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await roadmap.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateRoadmap,
  getRoadmapHistory,
  deleteRoadmap,
};