import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==========================================
// Pages
// ==========================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeViewer from "./pages/ResumeViewer";

import AIResumeAnalyzer from "./pages/AIResumeAnalyzer";

import AICareerCoach from "./pages/AICareerCoach";

import MockInterview from "./pages/MockInterview";

import LearningHub from "./pages/LearningHub";
import Roadmap from "./pages/Roadmap";

import JobTracker from "./pages/JobTracker";
import PlacementTracker from "./pages/PlacementTracker";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import NotFound from "./pages/NotFound";

// ==========================================
// App
// ==========================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================
            HOME
        ================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ==================================
            AUTHENTICATION
        ================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ==================================
            DASHBOARD
        ================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ==================================
            PROFILE
        ================================== */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ==================================
            RESUME
        ================================== */}

        <Route
          path="/resume-builder"
          element={<ResumeBuilder />}
        />

        <Route
          path="/resume-upload"
          element={<ResumeUpload />}
        />

        <Route
          path="/resume-viewer"
          element={<ResumeViewer />}
        />

        <Route
          path="/resume-analyzer"
          element={<AIResumeAnalyzer />}
        />

        {/* ==================================
            AI CAREER COACH
        ================================== */}

        <Route
          path="/career-coach"
          element={<AICareerCoach />}
        />

        {/* ==================================
            MOCK INTERVIEW
        ================================== */}

        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        {/* ==================================
            LEARNING HUB
        ================================== */}

        <Route
          path="/learning-hub"
          element={<LearningHub />}
        />

        {/* ==================================
            ROADMAP
        ================================== */}

        <Route
          path="/roadmap"
          element={<Roadmap />}
        />

        {/* ==================================
            JOB TRACKER
        ================================== */}

        <Route
          path="/job-tracker"
          element={<JobTracker />}
        />

        {/* ==================================
            PLACEMENT TRACKER
        ================================== */}

        <Route
          path="/placement-tracker"
          element={<PlacementTracker />}
        />

        {/* ==================================
            404
        ================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;