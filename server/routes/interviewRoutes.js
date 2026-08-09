const express = require("express");

const router = express.Router();

const {
  generateQuestion,
  evaluateAnswer,
} = require("../controllers/interviewController");

// ===============================
// Generate Interview Question
// ===============================

router.post("/generate", generateQuestion);

// ===============================
// Evaluate Interview Answer
// ===============================

router.post("/evaluate", evaluateAnswer);

module.exports = router;