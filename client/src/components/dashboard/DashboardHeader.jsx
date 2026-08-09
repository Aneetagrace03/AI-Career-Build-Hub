function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center bg-white rounded-2xl shadow-md p-6 mb-8">

      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back, {user?.name || "User"} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Let's build your dream career today.
        </p>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
        Upload Resume
      </button>

    </div>
  );
}

export default DashboardHeader;