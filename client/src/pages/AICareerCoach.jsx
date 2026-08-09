import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { askCareerCoach } from "../api/careerCoachApi";

function AICareerCoach() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await askCareerCoach(question);

      setResult(response.data.data);
    } catch (error) {
      console.error("Career Coach Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to get career advice."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            🎯 AI Career Coach
          </h1>

          <p className="text-gray-500 mt-2">
            Ask anything about your career, internships,
            placements, skills, projects, or interviews.
          </p>
        </div>

        {/* QUESTION BOX */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            💬 Ask Your Career Coach
          </h2>

          <textarea
            rows="5"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Example: How can I prepare for an AI/ML internship?"
            className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-red-600 mt-3">
              {error}
            </p>
          )}

          <button
            onClick={handleAsk}
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Thinking..."
              : "🤖 Ask Career Coach"}
          </button>

        </div>

        {/* RESULTS */}

        {result && (
          <div className="space-y-6">

            {/* ANSWER */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                💡 Career Advice
              </h2>

              <p className="text-gray-700 whitespace-pre-wrap">
                {result.answer}
              </p>

            </div>

            {/* ROADMAP */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                🛣️ Career Roadmap
              </h2>

              {result.roadmap?.length > 0 ? (
                <ol className="list-decimal pl-6 space-y-3">
                  {result.roadmap.map((item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">
                  No roadmap provided.
                </p>
              )}

            </div>

            {/* SKILLS */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                📚 Skills to Learn
              </h2>

              {result.skillsToLearn?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.skillsToLearn.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No skills suggested.
                </p>
              )}

            </div>

            {/* PROJECTS */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                💻 Project Suggestions
              </h2>

              {result.projectSuggestions?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-3">
                  {result.projectSuggestions.map(
                    (project, index) => (
                      <li key={index}>
                        {project}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No project suggestions.
                </p>
              )}

            </div>

            {/* NEXT STEPS */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                🚀 Next Steps
              </h2>

              {result.nextSteps?.length > 0 ? (
                <ol className="list-decimal pl-6 space-y-3">
                  {result.nextSteps.map((step, index) => (
                    <li key={index}>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">
                  No next steps provided.
                </p>
              )}

            </div>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default AICareerCoach;