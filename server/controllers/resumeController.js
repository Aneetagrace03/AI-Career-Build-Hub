const Resume = require("../models/Resume");

// =============================
// Upload Resume
// =============================
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    const { userId } = req.body;

    let resume = await Resume.findOne({ user: userId });

    if (resume) {
      resume.fileName = req.file.originalname;
      resume.filePath = req.file.path;

      await resume.save();

      return res.status(200).json({
        success: true,
        message: "Resume updated successfully.",
        resume,
      });
    }

    resume = await Resume.create({
      user: userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Resume upload failed.",
    });
  }
};

// =============================
// Get Resume
// =============================
const getResume = async (req, res) => {
  try {
    const { userId } = req.params;

    const resume = await Resume.findOne({ user: userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadResume,
  getResume,
};