import { useEffect, useMemo, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

import {
  getPlacements,
  addPlacement,
  deletePlacement,
} from "../api/placementApi";

function PlacementTracker() {
  const [placements, setPlacements] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    package: "",
    location: "",
    deadline: "",
    eligibility: "",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD PLACEMENTS
  // ==========================================

  const loadPlacements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPlacements();

      setPlacements(
        response.data.placements || []
      );
    } catch (error) {
      console.error(
        "Load Placements Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load placements."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlacements();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD PLACEMENT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setAdding(true);
      setError("");

      await addPlacement(formData);

      setFormData({
        company: "",
        role: "",
        package: "",
        location: "",
        deadline: "",
        eligibility: "",
      });

      await loadPlacements();

    } catch (error) {
      console.error(
        "Add Placement Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to add placement."
      );
    } finally {
      setAdding(false);
    }
  };

  // ==========================================
  // DELETE PLACEMENT
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this placement?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deletePlacement(id);

      setPlacements((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {
      console.error(
        "Delete Placement Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete placement."
      );
    }
  };

  // ==========================================
  // FILTER PLACEMENTS
  // ==========================================

  const filteredPlacements = useMemo(() => {
    return placements.filter((item) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        item.company
          ?.toLowerCase()
          .includes(searchText) ||
        item.role
          ?.toLowerCase()
          .includes(searchText) ||
        item.location
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    placements,
    search,
    statusFilter,
  ]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalPlacements =
    placements.length;

  const selectedPlacements =
    placements.filter(
      (item) =>
        item.status === "Selected" ||
        item.status === "Offer"
    ).length;

  const interviewPlacements =
    placements.filter(
      (item) =>
        item.status === "Interview"
    ).length;

  const pendingPlacements =
    placements.filter(
      (item) =>
        item.status === "Applied" ||
        item.status === "Pending"
    ).length;

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
      case "Offer":
        return "bg-green-100 text-green-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Applied":
      case "Pending":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            🎯 Placement Tracker
          </h1>

          <p className="text-gray-500 mt-2">
            Track companies, placement opportunities,
            deadlines and your selection progress.
          </p>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* ======================================
            STATISTICS
        ====================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">
              Total Opportunities
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalPlacements}
            </h2>
          </div>

          <div className="bg-yellow-500 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">
              Interviews
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {interviewPlacements}
            </h2>
          </div>

          <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">
              Selected
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {selectedPlacements}
            </h2>
          </div>

          <div className="bg-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm opacity-90">
              Pending
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {pendingPlacements}
            </h2>
          </div>

        </div>

        {/* ======================================
            ADD PLACEMENT
        ====================================== */}

        <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            ➕ Add Placement Opportunity
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* COMPANY */}

            <div>

              <label className="block font-semibold mb-2">
                Company *
              </label>

              <input
                type="text"
                name="company"
                placeholder="e.g. Microsoft"
                value={formData.company}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* ROLE */}

            <div>

              <label className="block font-semibold mb-2">
                Job Role *
              </label>

              <input
                type="text"
                name="role"
                placeholder="e.g. Software Engineer"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* PACKAGE */}

            <div>

              <label className="block font-semibold mb-2">
                Package *
              </label>

              <input
                type="text"
                name="package"
                placeholder="e.g. 12 LPA"
                value={formData.package}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* LOCATION */}

            <div>

              <label className="block font-semibold mb-2">
                Location *
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Bangalore"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* DEADLINE */}

            <div>

              <label className="block font-semibold mb-2">
                Application Deadline *
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />

            </div>

            {/* ELIGIBILITY */}

            <div>

              <label className="block font-semibold mb-2">
                Eligibility
              </label>

              <input
                type="text"
                name="eligibility"
                placeholder="e.g. B.Tech CSE, 2028 batch"
                value={formData.eligibility}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={adding}
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold"
            >
              {adding
                ? "Adding Placement..."
                : "➕ Add Placement"}
            </button>

          </form>

        </div>

        {/* ======================================
            PLACEMENT LIST
        ====================================== */}

        <div className="bg-white shadow-lg rounded-2xl p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                🏢 Placement Opportunities
              </h2>

              <p className="text-gray-500 mt-1">
                {filteredPlacements.length} opportunity
                {filteredPlacements.length !== 1
                  ? "ies"
                  : ""}
              </p>

            </div>

            {/* SEARCH + FILTER */}

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="Search company or role..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="border rounded-xl p-3 w-full sm:w-64"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="border rounded-xl p-3"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Applied">
                  Applied
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Offer">
                  Offer
                </option>

                <option value="Selected">
                  Selected
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

          {/* ======================================
              LOADING
          ====================================== */}

          {loading ? (

            <div className="text-center py-16">

              <div className="text-4xl mb-4">
                ⏳
              </div>

              <p className="font-semibold">
                Loading placements...
              </p>

            </div>

          ) : filteredPlacements.length === 0 ? (

            <div className="text-center py-16 bg-gray-50 rounded-xl">

              <div className="text-5xl mb-4">
                🎯
              </div>

              <h3 className="text-xl font-bold">
                No placements found
              </h3>

              <p className="text-gray-500 mt-2">
                Add a placement opportunity or
                change your search filter.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredPlacements.map(
                (item) => (

                  <div
                    key={item._id}
                    className="border rounded-2xl p-6 hover:shadow-md transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                      {/* DETAILS */}

                      <div className="flex-1">

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                          <div>

                            <h3 className="text-2xl font-bold">
                              {item.company}
                            </h3>

                            <p className="text-lg text-gray-700 mt-1">
                              {item.role}
                            </p>

                          </div>

                          <span
                            className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status ||
                              "Pending"}
                          </span>

                        </div>

                        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-gray-600">

                          <p>
                            💰{" "}
                            <span className="font-semibold">
                              Package:
                            </span>{" "}
                            {item.package}
                          </p>

                          <p>
                            📍{" "}
                            <span className="font-semibold">
                              Location:
                            </span>{" "}
                            {item.location}
                          </p>

                          <p>
                            📅{" "}
                            <span className="font-semibold">
                              Deadline:
                            </span>{" "}
                            {item.deadline
                              ? new Date(
                                  item.deadline
                                ).toLocaleDateString()
                              : "Not specified"}
                          </p>

                          <p>
                            🎓{" "}
                            <span className="font-semibold">
                              Eligibility:
                            </span>{" "}
                            {item.eligibility ||
                              "Not specified"}
                          </p>

                        </div>

                      </div>

                      {/* DELETE */}

                      <div className="flex items-start">

                        <button
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold"
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>
    </MainLayout>
  );
}

export default PlacementTracker;