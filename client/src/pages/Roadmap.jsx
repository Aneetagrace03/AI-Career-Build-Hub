import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  generateRoadmap,
  getRoadmapHistory,
  deleteRoadmap,
} from "../api/roadmapApi";

function Roadmap() {
  const [career, setCareer] = useState("");
  const [level, setLevel] = useState("Beginner");

  const [roadmap, setRoadmap] = useState("");
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [error, setError] = useState("");

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
    if (!career) {
      setError("Please select a career goal.");
      return;
    }

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
      console.error(
        "Generate Roadmap Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to generate roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VIEW HISTORY ROADMAP
  // ==========================================

  const handleViewRoadmap = (item) => {
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this roadmap?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteRoadmap(id);

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );

      setRoadmap("");
    } catch (error) {
      console.error(
        "Delete Roadmap Error:",
        error
      );

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
            📚 Learning Hub
          </h1>

          <p className="text-gray-500 mt-2">
            Generate a personalized AI learning
            roadmap for your career goal.
          </p>
        </div>

        {/* ======================================
            GENERATOR
        ====================================== */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            🗺️ Create Your Learning Roadmap
          </h2>

          {/* CAREER */}

          <label className="block font-semibold mb-2">
            Career Goal
          </label>

          <select
            value={career}
            onChange={(e) =>
              setCareer(e.target.value)
            }
            className="w-full border rounded-lg p-3 mb-5"
          >
            <option value="">
              Select a career
            </option>

            <option value="AI/ML Engineer">
              AI/ML Engineer
            </option>

            <option value="Software Engineer">
              Software Engineer
            </option>

            <option value="Data Scientist">
              Data Scientist
            </option>

            <option value="Data Analyst">
              Data Analyst
            </option>

            <option value="Frontend Developer">
              Frontend Developer
            </option>

            <option value="Backend Developer">
              Backend Developer
            </option>

            <option value="Full Stack Developer">
              Full Stack Developer
            </option>

            <option value="Cloud Engineer">
              Cloud Engineer
            </option>
          </select>

          {/* LEVEL */}

          <label className="block font-semibold mb-2">
            Current Skill Level
          </label>

          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value)
            }
            className="w-full border rounded-lg p-3 mb-5"
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

          {/* ERROR */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          {/* BUTTON */}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Generating Roadmap..."
              : "🚀 Generate Roadmap"}
          </button>
        </div>

        {/* ======================================
            GENERATED ROADMAP
        ====================================== */}

        {roadmap && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">

            <div className="mb-6">
              <h2 className="text-3xl font-bold">
                🗺️ Your Learning Roadmap
              </h2>

              <p className="text-gray-500 mt-1">
                {career} • {level}
              </p>
            </div>

            <div className="border rounded-lg p-6 bg-gray-50">
              <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-7">
                {roadmap}
              </pre>
            </div>
          </div>
        )}

        {/* ======================================
            HISTORY
        ====================================== */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            📜 Previous Roadmaps
          </h2>

          {historyLoading ? (
            <p className="text-gray-500">
              Loading roadmap history...
            </p>
          ) : history.length === 0 ? (
            <p className="text-gray-500">
              No previous roadmaps found.
            </p>
          ) : (
            <div className="space-y-4">

              {history.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-xl font-bold">
                      {item.career}
                    </h3>

                    <p className="text-gray-500">
                      Level: {item.level}
                    </p>

                    {item.createdAt && (
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        handleViewRoadmap(item)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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

export default Roadmap;