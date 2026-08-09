const express = require("express");

const router = express.Router();

const {
  saveProfile,
  getProfile,
  deleteProfile,
} = require("../controllers/profileController");

// Save Profile
router.post("/", saveProfile);

// Get Profile
router.get("/:userId", getProfile);

// Delete Profile
router.delete("/:userId", deleteProfile);

module.exports = router;