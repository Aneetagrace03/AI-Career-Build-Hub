const express = require("express");

const router = express.Router();

const {
  generateRoadmap,
  getRoadmapHistory,
  deleteRoadmap,
} = require("../controllers/roadmapController");

// Authentication Middleware
const protect = require("../middleware/authMiddleware");

// ==============================
// Generate AI Roadmap
// POST /api/roadmap/generate
// ==============================
router.post("/generate", protect, generateRoadmap);

// ==============================
// Get User Roadmap History
// GET /api/roadmap/history
// ==============================
router.get("/history", protect, getRoadmapHistory);

// ==============================
// Delete Roadmap
// DELETE /api/roadmap/:id
// ==============================
router.delete("/:id", protect, deleteRoadmap);

module.exports = router;