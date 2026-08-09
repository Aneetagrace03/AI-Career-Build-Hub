const express = require("express");

const router = express.Router();

const {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// ==============================
// Add Job
// ==============================

router.post("/", addJob);

// ==============================
// Get All Jobs
// ==============================

router.get("/", getJobs);

// ==============================
// Update Job
// ==============================

router.put("/:id", updateJob);

// ==============================
// Delete Job
// ==============================

router.delete("/:id", deleteJob);

module.exports = router;