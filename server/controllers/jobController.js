const Job = require("../models/Job");

// ==============================
// Add New Job
// ==============================
const addJob = async (req, res) => {
  try {
    const {
      user,
      company,
      role,
      location,
      status,
      notes,
    } = req.body;

    const job = await Job.create({
      user,
      company,
      role,
      location,
      status,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Job added successfully.",
      job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add job.",
    });
  }
};

// ==============================
// Get All Jobs
// ==============================
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs.",
    });
  }
};

// ==============================
// Update Job
// ==============================
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update job.",
    });
  }
};

// ==============================
// Delete Job
// ==============================
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete job.",
    });
  }
};

module.exports = {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
};