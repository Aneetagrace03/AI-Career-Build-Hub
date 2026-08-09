const Job = require("../models/Job");
const Placement = require("../models/Placement");
const Resume = require("../models/Resume");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalJobs = await Job.countDocuments({
      user: userId,
    });

    const totalPlacements = await Placement.countDocuments({
      user: userId,
    });

    const totalInterviews = await Placement.countDocuments({
      user: userId,
      status: "Interview",
    });

    const totalSelected = await Placement.countDocuments({
      user: userId,
      status: "Selected",
    });

    const resumeUploaded = await Resume.findOne({
      user: userId,
    });

    const user = await User.findById(userId);

    let profileCompletion = 0;

    if (user.name) profileCompletion += 25;
    if (user.email) profileCompletion += 25;
    if (resumeUploaded) profileCompletion += 25;
    if (totalPlacements > 0) profileCompletion += 25;

    res.status(200).json({
      success: true,

      stats: {
        totalJobs,
        totalPlacements,
        totalInterviews,
        totalSelected,
        resumeUploaded: !!resumeUploaded,
        profileCompletion,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });

  }
};

module.exports = {
  getDashboardStats,
};