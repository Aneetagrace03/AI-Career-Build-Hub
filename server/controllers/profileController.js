const Profile = require("../models/Profile");

// ================================
// Create or Update Profile
// ================================

const saveProfile = async (req, res) => {
  try {
    const {
      user,
      fullName,
      college,
      degree,
      branch,
      graduationYear,
      github,
      linkedin,
      skills,
      about,
    } = req.body;

    let profile = await Profile.findOne({ user });

    if (profile) {
      profile.fullName = fullName;
      profile.college = college;
      profile.degree = degree;
      profile.branch = branch;
      profile.graduationYear = graduationYear;
      profile.github = github;
      profile.linkedin = linkedin;
      profile.skills = skills;
      profile.about = about;

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        profile,
      });
    }

    profile = await Profile.create({
      user,
      fullName,
      college,
      degree,
      branch,
      graduationYear,
      github,
      linkedin,
      skills,
      about,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully.",
      profile,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================================
// Get Profile
// ================================

const getProfile = async (req, res) => {
  try {

    const profile = await Profile.findOne({
      user: req.params.userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================================
// Delete Profile
// ================================

const deleteProfile = async (req, res) => {
  try {

    await Profile.findOneAndDelete({
      user: req.params.userId,
    });

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  saveProfile,
  getProfile,
  deleteProfile,
};