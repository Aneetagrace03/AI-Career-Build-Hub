const ResumeBuilder = require("../models/ResumeBuilder");

// ======================================
// Create or Update Resume
// POST /api/resume-builder
// ======================================
const saveResume = async (req, res) => {
  try {
    const userId = req.user._id;

    let resume = await ResumeBuilder.findOne({
      user: userId,
    });

    if (resume) {
      resume = await ResumeBuilder.findOneAndUpdate(
        { user: userId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Resume updated successfully.",
        resume,
      });
    }

    resume = await ResumeBuilder.create({
      user: userId,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Resume created successfully.",
      resume,
    });
  } catch (error) {
    console.error("Save Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save resume.",
      error: error.message,
    });
  }
};

// ======================================
// Get Resume
// GET /api/resume-builder
// ======================================
const getResume = async (req, res) => {
  try {
    const resume = await ResumeBuilder.findOne({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Get Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume.",
      error: error.message,
    });
  }
};

// ======================================
// Delete Resume
// DELETE /api/resume-builder
// ======================================
const deleteResume = async (req, res) => {
  try {
    await ResumeBuilder.findOneAndDelete({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume.",
      error: error.message,
    });
  }
};

module.exports = {
  saveResume,
  getResume,
  deleteResume,
};