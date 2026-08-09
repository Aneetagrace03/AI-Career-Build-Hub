const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

// ==============================
// Route Imports
// ==============================

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const jobRoutes = require("./routes/jobRoutes");
const careerCoachRoutes = require("./routes/careerCoachRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const placementRoutes = require("./routes/placementRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resumeBuilderRoutes = require("./routes/resumeBuilderRoutes");
const mockInterviewRoutes = require("./routes/mockInterviewRoutes");

const app = express();

// ==============================
// Connect Database
// ==============================

connectDB();

// ==============================
// Middleware
// ==============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// Static Folder
// ==============================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==============================
// Debug Route Imports
// ==============================

console.log("====================================");
console.log("Route Debug Information");
console.log("====================================");

console.log("authRoutes:", typeof authRoutes);
console.log("profileRoutes:", typeof profileRoutes);
console.log("resumeRoutes:", typeof resumeRoutes);
console.log("aiRoutes:", typeof aiRoutes);
console.log("jobRoutes:", typeof jobRoutes);
console.log("careerCoachRoutes:", typeof careerCoachRoutes);
console.log("interviewRoutes:", typeof interviewRoutes);
console.log("roadmapRoutes:", typeof roadmapRoutes);
console.log("placementRoutes:", typeof placementRoutes);
console.log("dashboardRoutes:", typeof dashboardRoutes);
console.log("resumeBuilderRoutes:", typeof resumeBuilderRoutes);
console.log("mockInterviewRoutes:", typeof mockInterviewRoutes);

console.log("====================================");

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/career-coach", careerCoachRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/roadmap", roadmapRoutes);

app.use("/api/placements", placementRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/resume-builder", resumeBuilderRoutes);

app.use("/api/mock-interview", mockInterviewRoutes);

// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "🚀 AI Career Build Hub Backend Running Successfully",
  });
});

// ==============================
// 404 Route
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});