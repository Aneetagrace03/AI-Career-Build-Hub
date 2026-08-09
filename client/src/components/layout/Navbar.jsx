import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-md h-20 flex items-center justify-between px-8">

      {/* Left Section */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, {user?.name || "User"} 👋
        </p>
      </div>

      {/* Right Section */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />

        </div>

        {/* Notification */}

        <button className="relative">

          <Bell
            size={24}
            className="text-gray-700 hover:text-blue-600"
          />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
            3
          </span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div>

            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500">
              Student
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;