const express = require("express");

const router = express.Router();

const {
  askCareerCoach,
} = require("../controllers/careerCoachController");

// AI Career Coach
router.post("/chat", askCareerCoach);

module.exports = router;