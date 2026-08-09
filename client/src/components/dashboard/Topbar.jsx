function Topbar() {
  return (
    <header className="bg-white shadow p-6 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500">
          Here's an overview of your career progress.
        </p>
      </div>

      <button className="bg-blue-600 text-white px-5 py-3 rounded-xl">
        Upload Resume
      </button>

    </header>
  );
}

export default Topbar;