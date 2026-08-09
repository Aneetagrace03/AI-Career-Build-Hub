import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  startInterview,
  evaluateAnswer,
} from "../api/mockInterviewApi";

function MockInterview() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");

  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // START INTERVIEW
  // ==========================================

  const handleStartInterview = async () => {
    if (!role) {
      setError("Please select a job role.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setAnswer("");

      const response = await startInterview(
        role,
        difficulty
      );

      setQuestion(response.data.data.question);
      setCategory(response.data.data.category);

    } catch (error) {
      console.error("Start Interview Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EVALUATE ANSWER
  // ==========================================

  const handleEvaluate = async () => {
    if (!answer.trim()) {
      setError("Please enter your answer.");
      return;
    }

    try {
      setEvaluating(true);
      setError("");

      const response = await evaluateAnswer(
        role,
        difficulty,
        question,
        answer
      );

      setResult(response.data.data);

    } catch (error) {
      console.error(
        "Evaluate Answer Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to evaluate answer."
      );
    } finally {
      setEvaluating(false);
    }
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const handleNextQuestion = async () => {
    setResult(null);
    setAnswer("");

    await handleStartInterview();
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            🎤 AI Mock Interview
          </h1>

          <p className="text-gray-500 mt-2">
            Practice interview questions and get
            AI-powered feedback.
          </p>

        </div>

        {/* SETUP */}

        {!question && (
          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              🚀 Start Your Interview
            </h2>

            {/* ROLE */}

            <label className="block font-semibold mb-2">
              Job Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full border rounded-lg p-3 mb-5"
            >
              <option value="">
                Select a role
              </option>

              <option value="Software Engineer">
                Software Engineer
              </option>

              <option value="AI/ML Engineer">
                AI/ML Engineer
              </option>

              <option value="Data Analyst">
                Data Analyst
              </option>

              <option value="Data Scientist">
                Data Scientist
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
            </select>

            {/* DIFFICULTY */}

            <label className="block font-semibold mb-2">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              className="w-full border rounded-lg p-3 mb-5"
            >
              <option value="Easy">
                Easy
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Hard">
                Hard
              </option>
            </select>

            {error && (
              <p className="text-red-600 mb-4">
                {error}
              </p>
            )}

            <button
              onClick={handleStartInterview}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Generating Question..."
                : "🎤 Start Interview"}
            </button>

          </div>
        )}

        {/* QUESTION */}

        {question && (
          <div className="space-y-6">

            <div className="bg-white rounded-xl shadow-lg p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">
                  Interview Question
                </h2>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  {difficulty}
                </span>

              </div>

              {category && (
                <p className="text-gray-500 mb-3">
                  Category: {category}
                </p>
              )}

              <p className="text-xl font-semibold">
                {question}
              </p>

            </div>

            {/* ANSWER */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                ✍️ Your Answer
              </h2>

              <textarea
                rows="8"
                value={answer}
                onChange={(e) =>
                  setAnswer(e.target.value)
                }
                placeholder="Type your answer here..."
                className="w-full border rounded-lg p-4"
              />

              {error && (
                <p className="text-red-600 mt-3">
                  {error}
                </p>
              )}

              <button
                onClick={handleEvaluate}
                disabled={evaluating}
                className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
              >
                {evaluating
                  ? "Evaluating..."
                  : "📊 Evaluate My Answer"}
              </button>

            </div>

            {/* RESULT */}

            {result && (
              <div className="space-y-6">

                {/* SCORE */}

                <div className="bg-white rounded-xl shadow-lg p-6 text-center">

                  <h2 className="text-2xl font-bold mb-4">
                    📊 Your Score
                  </h2>

                  <div className="text-6xl font-bold text-blue-600">
                    {result.score}
                  </div>

                  <p className="text-gray-500 mt-2">
                    out of 100
                  </p>

                </div>

                {/* FEEDBACK */}

                <div className="bg-white rounded-xl shadow-lg p-6">

                  <h2 className="text-2xl font-bold mb-4">
                    💡 Feedback
                  </h2>

                  <p className="text-gray-700 whitespace-pre-wrap">
                    {result.feedback}
                  </p>

                </div>

                {/* STRENGTHS */}

                <div className="bg-white rounded-xl shadow-lg p-6">

                  <h2 className="text-2xl font-bold mb-4">
                    💪 What You Did Well
                  </h2>

                  {result.strengths?.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-2">
                      {result.strengths.map(
                        (item, index) => (
                          <li key={index}>
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      No strengths provided.
                    </p>
                  )}

                </div>

                {/* IMPROVEMENTS */}

                <div className="bg-white rounded-xl shadow-lg p-6">

                  <h2 className="text-2xl font-bold mb-4">
                    ⚠️ Improvements
                  </h2>

                  {result.improvements?.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-2">
                      {result.improvements.map(
                        (item, index) => (
                          <li key={index}>
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      No improvements provided.
                    </p>
                  )}

                </div>

                {/* IDEAL ANSWER */}

                <div className="bg-white rounded-xl shadow-lg p-6">

                  <h2 className="text-2xl font-bold mb-4">
                    ⭐ Example Strong Answer
                  </h2>

                  <p className="text-gray-700 whitespace-pre-wrap">
                    {result.idealAnswer}
                  </p>

                </div>

                {/* NEXT QUESTION */}

                <button
                  onClick={handleNextQuestion}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  {loading
                    ? "Generating..."
                    : "➡️ Next Question"}
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default MockInterview;