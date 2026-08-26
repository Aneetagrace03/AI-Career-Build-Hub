import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  generateRoadmap,
  getRoadmapHistory,
  deleteRoadmap,
} from "../api/roadmapApi";

function LearningHub() {
  const [career, setCareer] = useState("Full Stack Developer");
  const [level, setLevel] = useState("Beginner");

  const [roadmap, setRoadmap] = useState("");
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [error, setError] = useState("");

  const careers = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Java Developer",
    "Python Developer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Analyst",
    "Data Scientist",
    "Cloud Engineer",
    "Cyber Security",
    "DevOps Engineer",
  ];

  // ==========================================
  // LOAD ROADMAP HISTORY
  // ==========================================

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setHistoryLoading(true);

      const response = await getRoadmapHistory();

      setHistory(response.data.roadmaps || []);
    } catch (error) {
      console.error("History Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load roadmap history."
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  // ==========================================
  // GENERATE ROADMAP
  // ==========================================

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");
      setRoadmap("");

      const response = await generateRoadmap(
        career,
        level
      );

      setRoadmap(response.data.roadmap || "");

      await loadHistory();

    } catch (error) {
      console.error("Roadmap Generation Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to generate roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VIEW PREVIOUS ROADMAP
  // ==========================================

  const handleView = (item) => {
    setCareer(item.career);
    setLevel(item.level);
    setRoadmap(item.roadmap);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // DELETE ROADMAP
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this roadmap?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteRoadmap(id);

      setHistory((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      setError("");

    } catch (error) {
      console.error("Delete Roadmap Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete roadmap."
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            📚 AI Learning Hub
          </h1>

          <p className="text-gray-500 mt-2">
            Build a personalized learning roadmap for
            your career goals with AI.
          </p>

        </div>

        {/* ======================================
            GENERATOR CARD
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            🎯 Create Your Learning Roadmap
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* CAREER */}

            <div>

              <label className="block font-semibold mb-2">
                Career Goal
              </label>

              <select
                value={career}
                onChange={(e) =>
                  setCareer(e.target.value)
                }
                className="w-full border rounded-xl p-3"
              >

                {careers.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* LEVEL */}

            <div>

              <label className="block font-semibold mb-2">
                Experience Level
              </label>

              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value)
                }
                className="w-full border rounded-xl p-3"
              >

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>

              </select>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
              {error}
            </div>
          )}

          {/* GENERATE BUTTON */}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold"
          >

            {loading
              ? "🤖 Generating Roadmap..."
              : "🚀 Generate AI Roadmap"}

          </button>

        </div>

        {/* ======================================
            CURRENT ROADMAP
        ====================================== */}

        {roadmap && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

              <div>

                <h2 className="text-3xl font-bold">
                  🗺️ Your AI Roadmap
                </h2>

                <p className="text-gray-500 mt-2">
                  {career} • {level}
                </p>

              </div>

            </div>

            <div className="bg-gray-50 border rounded-xl p-6">

              <div className="whitespace-pre-wrap leading-8 text-gray-700">
                {roadmap}
              </div>

            </div>

          </div>
        )}

        {/* ======================================
            ROADMAP HISTORY
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            📜 My Previous Roadmaps
          </h2>

          {historyLoading ? (

            <div className="text-gray-500">
              Loading your roadmaps...
            </div>

          ) : history.length === 0 ? (

            <div className="text-gray-500 bg-gray-50 rounded-xl p-6">
              You haven't generated any roadmaps yet.
            </div>

          ) : (

            <div className="space-y-4">

              {history.map((item) => (

                <div
                  key={item._id}
                  className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >

                  <div>

                    <h3 className="text-xl font-bold">
                      {item.career}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Level: {item.level}
                    </p>

                    {item.createdAt && (
                      <p className="text-sm text-gray-400 mt-1">
                        Created:{" "}
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </p>
                    )}

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        handleView(item)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </MainLayout>
  );
}

export default LearningHub;