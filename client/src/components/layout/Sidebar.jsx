import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
    {
      name: "Resume Upload",
      path: "/resume-upload",
      icon: "📄",
    },
    {
      name: "Resume Viewer",
      path: "/resume",
      icon: "📑",
    },
    {
      name: "Resume Builder",
      path: "/resume-builder",
      icon: "📝",
    },
    {
      name: "AI Resume Analyzer",
      path: "/ai-resume-analyzer",
      icon: "🤖",
    },
    {
      name: "Job Tracker",
      path: "/jobs",
      icon: "💼",
    },
    {
      name: "AI Career Coach",
      path: "/career-coach",
      icon: "🎯",
    },
    {
      name: "Mock Interview",
      path: "/mock-interview",
      icon: "🎤",
    },
    {
      name: "Learning Hub",
      path: "/learning-hub",
      icon: "📚",
    },
    {
      name: "Placement Tracker",
      path: "/placements",
      icon: "🏢",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white">

      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">
          AI Career Hub
        </h1>
      </div>

      <nav className="mt-5">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-4 transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </Link>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;