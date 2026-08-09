const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addPlacement,
  getPlacements,
  updatePlacement,
  deletePlacement,
} = require("../controllers/placementController");

// =====================================
// Add New Company
// POST /api/placements
// =====================================
router.post("/", protect, addPlacement);

// =====================================
// Get All Companies
// GET /api/placements
// =====================================
router.get("/", protect, getPlacements);

// =====================================
// Update Company
// PUT /api/placements/:id
// =====================================
router.put("/:id", protect, updatePlacement);

// =====================================
// Delete Company
// DELETE /api/placements/:id
// =====================================
router.delete("/:id", protect, deletePlacement);

module.exports = router;