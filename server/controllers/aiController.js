const { extractTextFromPDF } = require("../utils/pdfExtractor");
const { analyzeResume } = require("../services/geminiService");

const analyzeResumeController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file received.",
      });
    }

    console.log("PDF received:", req.file.originalname);

    const resumeText = await extractTextFromPDF(req.file.path);

    console.log("PDF text extracted:", resumeText.length);

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF.",
      });
    }

    console.log("Sending text to Gemini...");

    const analysis = await analyzeResume(resumeText);

    console.log("Gemini response received.");

    let result;

    try {
      result = JSON.parse(analysis);
    } catch (error) {
      console.log("JSON parsing failed.");
      console.log("Gemini returned:", analysis);

      return res.status(500).json({
        success: false,
        message: "Gemini did not return valid JSON.",
        rawResponse: analysis,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis: result,
    });

  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze resume.",
      error: String(error),
    });
  }
};

module.exports = {
  analyzeResumeController,
};