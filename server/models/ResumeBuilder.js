const mongoose = require("mongoose");

const resumeBuilderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    education: [
      {
        college: String,
        degree: String,
        branch: String,
        year: String,
        cgpa: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        technologies: String,
        github: String,
      },
    ],

    certifications: [
      {
        title: String,
        organization: String,
        year: String,
      },
    ],

    languages: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResumeBuilder", resumeBuilderSchema);