import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        AI Career Hub
      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="block hover:bg-slate-700 rounded-lg p-3"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/resume"
          className="block hover:bg-slate-700 rounded-lg p-3"
        >
          📄 Resume
        </Link>

        <Link
          to="/jobs"
          className="block hover:bg-slate-700 rounded-lg p-3"
        >
          💼 Jobs
        </Link>

        <Link
          to="/profile"
          className="block hover:bg-slate-700 rounded-lg p-3"
        >
          👤 Profile
        </Link>

      </nav>
    </aside>
  );
}

export default Sidebar;