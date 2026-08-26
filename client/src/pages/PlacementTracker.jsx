import { useEffect, useMemo, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

import {
  getPlacements,
  addPlacement,
  updatePlacement,
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

  const statuses = [
    "Applied",
    "Online Test",
    "Interview",
    "Selected",
    "Rejected",
  ];

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
  // HANDLE FORM CHANGE
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
  // UPDATE STATUS
  // ==========================================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      setError("");

      const response = await updatePlacement(
        id,
        { status }
      );

      const updatedPlacement =
        response.data.placement;

      setPlacements((previous) =>
        previous.map((item) =>
          item._id === id
            ? updatedPlacement
            : item
        )
      );

    } catch (error) {
      console.error(
        "Update Status Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update placement status."
      );
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
  // FILTER
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

  const appliedCount =
    placements.filter(
      (item) => item.status === "Applied"
    ).length;

  const onlineTestCount =
    placements.filter(
      (item) =>
        item.status === "Online Test"
    ).length;

  const interviewCount =
    placements.filter(
      (item) => item.status === "Interview"
    ).length;

  const selectedCount =
    placements.filter(
      (item) => item.status === "Selected"
    ).length;

  const rejectedCount =
    placements.filter(
      (item) => item.status === "Rejected"
    ).length;

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";

      case "Online Test":
        return "bg-purple-100 text-purple-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Selected":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

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
            Track your placement opportunities
            from application to selection.
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">

          <div className="bg-blue-600 text-white rounded-xl p-5 shadow">
            <p className="text-sm">
              Total
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalPlacements}
            </h2>
          </div>

          <div className="bg-indigo-600 text-white rounded-xl p-5 shadow">
            <p className="text-sm">
              Applied
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {appliedCount}
            </h2>
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-5 shadow">
            <p className="text-sm">
              Online Test
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {onlineTestCount}
            </h2>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-5 shadow">
            <p className="text-sm">
              Interviews
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {interviewCount}
            </h2>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-5 shadow">
            <p className="text-sm">
              Selected
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {selectedCount}
            </h2>
          </div>

          <div className="bg-red-500 text-white rounded-xl p-5 shadow">
            <p className="text-sm">
              Rejected
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {rejectedCount}
            </h2>
          </div>

        </div>

        {/* ======================================
            ADD PLACEMENT
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            ➕ Add Placement Opportunity
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <div>
              <label className="block font-semibold mb-2">
                Company *
              </label>

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Job Role *
              </label>

              <input
                type="text"
                name="role"
                placeholder="Software Engineer"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Package *
              </label>

              <input
                type="text"
                name="package"
                placeholder="12 LPA"
                value={formData.package}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Location *
              </label>

              <input
                type="text"
                name="location"
                placeholder="Bangalore"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Deadline *
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

            <div>
              <label className="block font-semibold mb-2">
                Eligibility
              </label>

              <input
                type="text"
                name="eligibility"
                placeholder="B.Tech CSE, 2028 batch"
                value={formData.eligibility}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <button
              type="submit"
              disabled={adding}
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold"
            >
              {adding
                ? "Adding..."
                : "➕ Add Placement"}
            </button>

          </form>

        </div>

        {/* ======================================
            PLACEMENT LIST
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                🏢 My Placement Opportunities
              </h2>

              <p className="text-gray-500 mt-1">
                {filteredPlacements.length} opportunity
                {filteredPlacements.length !== 1
                  ? "ies"
                  : ""}
              </p>

            </div>

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

                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}

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
                Add a placement opportunity
                to get started.
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

                      <div className="flex-1">

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

                          <div>

                            <h3 className="text-2xl font-bold">
                              {item.company}
                            </h3>

                            <p className="text-lg text-gray-700 mt-1">
                              {item.role}
                            </p>

                          </div>

                          <span
                            className={`h-fit w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>

                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 mt-5 text-gray-600">

                          <p>
                            💰{" "}
                            <strong>
                              Package:
                            </strong>{" "}
                            {item.package}
                          </p>

                          <p>
                            📍{" "}
                            <strong>
                              Location:
                            </strong>{" "}
                            {item.location}
                          </p>

                          <p>
                            📅{" "}
                            <strong>
                              Deadline:
                            </strong>{" "}
                            {item.deadline
                              ? new Date(
                                  item.deadline
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>

                          <p>
                            🎓{" "}
                            <strong>
                              Eligibility:
                            </strong>{" "}
                            {item.eligibility ||
                              "Not specified"}
                          </p>

                        </div>

                        {/* STATUS UPDATE */}

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">

                          <label className="font-semibold">
                            Update Status:
                          </label>

                          <select
                            value={
                              item.status
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                item._id,
                                e.target.value
                              )
                            }
                            className="border rounded-lg px-4 py-2 w-fit"
                          >

                            {statuses.map(
                              (status) => (
                                <option
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </option>
                              )
                            )}

                          </select>

                        </div>

                      </div>

                      {/* DELETE */}

                      <div>

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