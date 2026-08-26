function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Resume Analyzer",
      description:
        "Analyze your resume and improve your ATS score with AI-powered suggestions.",
    },
    {
      icon: "🎯",
      title: "Personalized Roadmaps",
      description:
        "Receive a customized roadmap based on your career goals and current skills.",
    },
    {
      icon: "💼",
      title: "Job Tracker",
      description:
        "Track job applications, interviews, offers, and rejections in one dashboard.",
    },
    {
      icon: "🎤",
      title: "AI Interview Prep",
      description:
        "Practice technical and HR interview questions with AI feedback.",
    },
    {
      icon: "📊",
      title: "Skill Analytics",
      description:
        "Visualize your strengths, weaknesses, and learning progress.",
    },
    {
      icon: "🏆",
      title: "Career Recommendations",
      description:
        "Discover the best career paths and job opportunities based on your profile.",
    },
  ];

  return (
   <section id="features" className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-4">
          Why Choose AI Career Build Hub?
        </h2>

        <p className="text-center text-gray-600 mb-16 text-lg">
          Everything you need to build a successful software engineering career.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300"
            >
              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;