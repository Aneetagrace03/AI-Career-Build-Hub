import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { generateRoadmap } from "../api/roadmapApi";

function LearningHub() {
  const [career, setCareer] = useState("Full Stack Developer");
  const [level, setLevel] = useState("Beginner");

  const [roadmap, setRoadmap] = useState("");

  const [loading, setLoading] = useState(false);

  const careers = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Java Developer",
    "Python Developer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Analyst",
    "Cloud Engineer",
    "Cyber Security",
  ];

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await generateRoadmap(career, level);

      setRoadmap(response.data.roadmap);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to generate roadmap."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          📚 AI Learning Hub
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block font-semibold mb-2">
                Career Goal
              </label>

              <select
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                {careers.map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Experience Level
              </label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

            </div>

          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >
            {loading
              ? "Generating..."
              : "Generate AI Roadmap"}
          </button>

        </div>

        {roadmap && (

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Your AI Roadmap
            </h2>

            <div className="whitespace-pre-wrap leading-8">
              {roadmap}
            </div>

          </div>

        )}

      </div>

    </MainLayout>
  );
}

export default LearningHub;