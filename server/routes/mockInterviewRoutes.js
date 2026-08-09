const express = require("express");

const router = express.Router();

const {
  startInterview,
  evaluateAnswer,
} = require("../controllers/mockInterviewController");

router.post("/start", startInterview);

router.post("/evaluate", evaluateAnswer);

module.exports = router;