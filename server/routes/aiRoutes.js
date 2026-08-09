const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  analyzeResumeController,
} = require("../controllers/aiController");

// Analyze Resume
router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResumeController
);

module.exports = router;