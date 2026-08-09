import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardAnalytics from "../components/dashboard/DashboardAnalytics";
import ApplicationsChart from "../components/dashboard/ApplicationsChart";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getJobs } from "../api/jobApi";
import { getDashboardStats } from "../api/dashboardApi";

function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [jobsResponse, dashboardResponse] =
        await Promise.all([
          getJobs(),
          getDashboardStats(),
        ]);

      setJobs(
        jobsResponse.data.jobs || []
      );

      setDashboardStats(
        dashboardResponse.data.stats || null
      );

    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // QUICK ACTIONS
  // ==========================================

  const quickActions = [
    {
      title: "Build Resume",
      description:
        "Create and update your professional resume.",
      icon: "📄",
      path: "/resume-builder",
      className:
        "bg-blue-50 hover:bg-blue-100 border-blue-200",
    },
    {
      title: "Analyze Resume",
      description:
        "Check your resume with AI and get ATS feedback.",
      icon: "🤖",
      path: "/resume-upload",
      className:
        "bg-purple-50 hover:bg-purple-100 border-purple-200",
    },
    {
      title: "Mock Interview",
      description:
        "Practice interviews with your AI interviewer.",
      icon: "🎤",
      path: "/mock-interview",
      className:
        "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
    },
    {
      title: "Learning Hub",
      description:
        "Generate a personalized AI learning roadmap.",
      icon: "📚",
      path: "/learning-hub",
      className:
        "bg-green-50 hover:bg-green-100 border-green-200",
    },
    {
      title: "Job Tracker",
      description:
        "Track your job applications and progress.",
      icon: "💼",
      path: "/job-tracker",
      className:
        "bg-pink-50 hover:bg-pink-100 border-pink-200",
    },
    {
      title: "My Profile",
      description:
        "Update your career profile and information.",
      icon: "👤",
      path: "/profile",
      className:
        "bg-gray-50 hover:bg-gray-100 border-gray-200",
    },
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        {/* ======================================
            WELCOME SECTION
        ====================================== */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Track your career journey with
            AI Career Build Hub.
          </p>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* ======================================
            LOADING
        ====================================== */}

        {loading ? (

          <div className="text-center py-20">

            <div className="text-5xl mb-5">
              ⏳
            </div>

            <p className="text-xl font-semibold">
              Loading Dashboard...
            </p>

            <p className="text-gray-500 mt-2">
              Fetching your career information.
            </p>

          </div>

        ) : (

          <>
            {/* ======================================
                SUMMARY CARDS
            ====================================== */}

            {dashboardStats && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">

                {/* JOBS */}

                <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg">
                  <p className="text-sm opacity-90">
                    Jobs Applied
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {dashboardStats.totalJobs || 0}
                  </h2>
                </div>

                {/* PLACEMENTS */}

                <div className="bg-green-600 rounded-xl p-5 text-white shadow-lg">
                  <p className="text-sm opacity-90">
                    Placements
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {dashboardStats.totalPlacements || 0}
                  </h2>
                </div>

                {/* INTERVIEWS */}

                <div className="bg-yellow-500 rounded-xl p-5 text-white shadow-lg">
                  <p className="text-sm opacity-90">
                    Interviews
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {dashboardStats.totalInterviews || 0}
                  </h2>
                </div>

                {/* SELECTED */}

                <div className="bg-purple-600 rounded-xl p-5 text-white shadow-lg">
                  <p className="text-sm opacity-90">
                    Selected
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {dashboardStats.totalSelected || 0}
                  </h2>
                </div>

                {/* RESUME */}

                <div className="bg-pink-600 rounded-xl p-5 text-white shadow-lg">
                  <p className="text-sm opacity-90">
                    Resume
                  </p>

                  <h2 className="text-lg font-bold mt-2">
                    {dashboardStats.resumeUploaded
                      ? "Uploaded"
                      : "Not Uploaded"}
                  </h2>
                </div>

                {/* PROFILE */}

                <div className="bg-gray-800 rounded-xl p-5 text-white shadow-lg">
                  <p className="text-sm opacity-90">
                    Profile
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {dashboardStats.profileCompletion ||
                      0}
                    %
                  </h2>
                </div>

              </div>
            )}

            {/* ======================================
                QUICK ACTIONS
            ====================================== */}

            <div className="mb-10">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-2xl font-bold">
                    🚀 Quick Actions
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Continue building your career.
                  </p>
                </div>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {quickActions.map(
                  (action) => (

                    <button
                      key={action.path}
                      onClick={() =>
                        navigate(action.path)
                      }
                      className={`text-left border rounded-2xl p-6 transition shadow-sm hover:shadow-md ${action.className}`}
                    >

                      <div className="text-4xl mb-4">
                        {action.icon}
                      </div>

                      <h3 className="text-xl font-bold">
                        {action.title}
                      </h3>

                      <p className="text-gray-600 mt-2 text-sm leading-6">
                        {action.description}
                      </p>

                      <div className="mt-4 font-semibold text-sm">
                        Open →
                      </div>

                    </button>

                  )
                )}

              </div>

            </div>

            {/* ======================================
                CAREER PROGRESS
            ====================================== */}

            {dashboardStats && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      📈 Career Progress
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Complete your profile to improve
                      your career readiness.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate("/profile")
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Update Profile
                  </button>

                </div>

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      Profile Completion
                    </span>

                    <span className="font-bold">
                      {dashboardStats.profileCompletion ||
                        0}
                      %
                    </span>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4">

                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          dashboardStats.profileCompletion ||
                            0,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            )}

            {/* ======================================
                EXISTING DASHBOARD STATISTICS
            ====================================== */}

            <DashboardStats jobs={jobs} />

            {/* ======================================
                ANALYTICS
            ====================================== */}

            {dashboardStats && (
              <DashboardAnalytics
                stats={dashboardStats}
              />
            )}

            {/* ======================================
                CHARTS + RECENT ACTIVITY
            ====================================== */}

            <div className="grid lg:grid-cols-2 gap-8 mt-10">

              <ApplicationsChart
                jobs={jobs}
              />

              <RecentActivity
                jobs={jobs}
              />

            </div>

            {/* ======================================
                BOTTOM CTA
            ====================================== */}

            <div className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Ready for your next opportunity? 🚀
                  </h2>

                  <p className="mt-2 text-blue-100">
                    Improve your resume, practice interviews,
                    and keep learning.
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate("/mock-interview")
                  }
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-bold"
                >
                  Practice Interview →
                </button>

              </div>

            </div>

          </>
        )}

      </div>
    </MainLayout>
  );
}

export default Dashboard;