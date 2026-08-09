import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { analyzeResume } from "../api/aiResumeAnalyzerApi";

function AIResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a resume PDF first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await analyzeResume(file);

      setResult(response.data.analysis);
    } catch (error) {
      console.error("Resume Analysis Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">

        {/* ==============================
            HEADER
        ============================== */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            🤖 AI Resume Analyzer
          </h1>

          <p className="text-gray-500 mt-2">
            Upload your resume and get AI-powered ATS analysis.
          </p>
        </div>

        {/* ==============================
            UPLOAD CARD
        ============================== */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            📄 Upload Resume
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-3"
          />

          {file && (
            <p className="mt-3 text-green-600">
              Selected: {file.name}
            </p>
          )}

          {error && (
            <p className="mt-3 text-red-600">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Analyzing Resume..."
              : "🔍 Analyze Resume"}
          </button>

        </div>

        {/* ==============================
            RESULT
        ============================== */}

        {result && (
          <div className="space-y-6">

            {/* ATS SCORE */}

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">

              <h2 className="text-2xl font-bold mb-4">
                📊 ATS Score
              </h2>

              <div className="text-6xl font-bold text-blue-600">
                {result.atsScore ?? 0}
              </div>

              <p className="text-gray-500 mt-2">
                out of 100
              </p>

            </div>

            {/* SUMMARY */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                📝 Resume Summary
              </h2>

              <p className="text-gray-700">
                {result.summary || "No summary available."}
              </p>

            </div>

            {/* STRENGTHS */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                💪 Strengths
              </h2>

              {result.strengths?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2">
                  {result.strengths.map((item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No strengths returned.
                </p>
              )}

            </div>

            {/* WEAKNESSES */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                ⚠️ Weaknesses
              </h2>

              {result.weaknesses?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2">
                  {result.weaknesses.map((item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No weaknesses returned.
                </p>
              )}

            </div>

            {/* MISSING SKILLS */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                🎯 Missing Skills
              </h2>

              {result.missingSkills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No missing skills identified.
                </p>
              )}

            </div>

            {/* SUGGESTIONS */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                💡 Suggestions
              </h2>

              {result.suggestions?.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2">
                  {result.suggestions.map((item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No suggestions returned.
                </p>
              )}

            </div>

            {/* INTERVIEW QUESTIONS */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-4">
                🎤 Interview Questions
              </h2>

              {result.interviewQuestions?.length > 0 ? (
                <ol className="list-decimal pl-6 space-y-3">
                  {result.interviewQuestions.map(
                    (question, index) => (
                      <li key={index}>
                        {question}
                      </li>
                    )
                  )}
                </ol>
              ) : (
                <p className="text-gray-500">
                  No interview questions returned.
                </p>
              )}

            </div>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default AIResumeAnalyzer;