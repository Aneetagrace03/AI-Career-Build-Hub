const Placement = require("../models/Placement");

// ========================================
// Add New Company
// POST /api/placements
// ========================================
const addPlacement = async (req, res) => {
  try {
    const {
      company,
      role,
      package,
      location,
      deadline,
      eligibility,
    } = req.body;

    if (
      !company ||
      !role ||
      !package ||
      !location ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const placement = await Placement.create({
      user: req.user._id,
      company,
      role,
      package,
      location,
      deadline,
      eligibility,
    });

    res.status(201).json({
      success: true,
      message: "Company added successfully.",
      placement,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add company.",
    });

  }
};

// ========================================
// Get All Companies
// GET /api/placements
// ========================================
const getPlacements = async (req, res) => {
  try {

    const placements = await Placement.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      placements,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch companies.",
    });

  }
};

// ========================================
// Update Placement
// PUT /api/placements/:id
// ========================================
const updatePlacement = async (req, res) => {
  try {

    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (placement.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    Object.assign(placement, req.body);

    await placement.save();

    res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      placement,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update company.",
    });

  }
};

// ========================================
// Delete Placement
// DELETE /api/placements/:id
// ========================================
const deletePlacement = async (req, res) => {
  try {

    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (placement.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await placement.deleteOne();

    res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete company.",
    });

  }
};

module.exports = {
  addPlacement,
  getPlacements,
  updatePlacement,
  deletePlacement,
};