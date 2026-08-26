const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  startInterview,
  evaluateAnswer,
} = require("../controllers/mockInterviewController");

router.post(
  "/start",
  protect,
  startInterview
);

router.post(
  "/evaluate",
  protect,
  evaluateAnswer
);

module.exports = router;