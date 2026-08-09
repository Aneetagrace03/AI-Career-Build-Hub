import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResume } from "../api/resumeApi";

function ResumeViewer() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await getResume(user.id);
      setResume(response.data.resume);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          📄 My Resume
        </h1>

        {resume ? (
          <>
            <div className="border rounded-xl p-6 bg-gray-50">

              <h2 className="text-xl font-semibold">
                {resume.fileName}
              </h2>

              <p className="text-gray-500 mt-2">
                Uploaded Successfully
              </p>

              <div className="mt-6 flex gap-4">

                <a
                  href={`http://localhost:5000/${resume.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
                >
                  👁 View Resume
                </a>

                <a
                  href={`http://localhost:5000/${resume.filePath}`}
                  download
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
                >
                  📥 Download
                </a>

              </div>

            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-gray-500">
              No resume uploaded.
            </p>

            <button
              onClick={() => navigate("/resume-upload")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Upload Resume
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default ResumeViewer;