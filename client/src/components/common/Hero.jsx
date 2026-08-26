import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <p className="uppercase tracking-widest text-blue-200 font-semibold mb-3">
            AI Powered Career Platform
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Build Your Dream
            <span className="text-yellow-300"> Tech Career </span>
            with AI
          </h1>

          <p className="text-lg text-gray-200 mb-8 leading-8">
            Analyze your resume, prepare for interviews, learn the right
            skills, track job applications, and receive personalized career
            guidance — all in one platform.
          </p>

          {/* Buttons */}
          <div className="flex gap-5">

            <button
              onClick={() => navigate("/register")}
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </button>

            <button
              onClick={handleLearnMore}
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
            >
              Learn More
            </button>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl w-full max-w-md">

            <h2 className="text-3xl font-bold mb-8 text-center">
              AI Career Assistant
            </h2>

            <div className="space-y-5">

              <div className="bg-white/20 rounded-xl p-4">
                📄 Resume Score: <strong>92%</strong>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                💼 Jobs Matched: <strong>245</strong>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                🎯 Interview Readiness: <strong>88%</strong>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                🚀 Career Roadmap Generated
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;