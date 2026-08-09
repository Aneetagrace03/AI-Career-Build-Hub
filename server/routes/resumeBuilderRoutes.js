const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  saveResume,
  getResume,
  deleteResume,
} = require("../controllers/resumeBuilderController");

// Save or Update Resume
router.post("/", protect, saveResume);

// Get Resume
router.get("/", protect, getResume);

// Delete Resume
router.delete("/", protect, deleteResume);

module.exports = router;