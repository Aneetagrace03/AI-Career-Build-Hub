import { useEffect, useMemo, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import JobStats from "../components/jobs/JobStats";

import {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../api/jobApi";

function JobTracker() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    notes: "",
    jobUrl: "",
    applicationDate: "",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD JOBS
  // ==========================================

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getJobs();

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error(
        "Error loading jobs:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load job applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
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
  // ADD JOB
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!formData.role.trim()) {
      setError("Job role is required.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      await addJob({
        user: user?.id,
        ...formData,
      });

      setFormData({
        company: "",
        role: "",
        location: "",
        status: "Applied",
        notes: "",
        jobUrl: "",
        applicationDate: "",
      });

      await loadJobs();

    } catch (error) {
      console.error(
        "Add Job Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to add job application."
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

      await updateJob(id, {
        status,
      });

      setJobs((previous) =>
        previous.map((job) =>
          job._id === id
            ? {
                ...job,
                status,
              }
            : job
        )
      );

    } catch (error) {
      console.error(
        "Update Status Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update job status."
      );
    }
  };

  // ==========================================
  // DELETE JOB
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteJob(id);

      setJobs((previous) =>
        previous.filter(
          (job) => job._id !== id
        )
      );

    } catch (error) {
      console.error(
        "Delete Job Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  // ==========================================
  // FILTER JOBS
  // ==========================================

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        job.company
          ?.toLowerCase()
          .includes(searchText) ||
        job.role
          ?.toLowerCase()
          .includes(searchText) ||
        job.location
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        job.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [jobs, search, statusFilter]);

  // ==========================================
  // STATUS BADGE
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Offer":
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
            💼 Job Tracker
          </h1>

          <p className="text-gray-500 mt-2">
            Track your job applications and
            placement journey.
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

        <JobStats jobs={jobs} />

        {/* ======================================
            ADD JOB
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            ➕ Add New Job Application
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* COMPANY */}

            <div>

              <label className="block font-semibold mb-2">
                Company Name *
              </label>

              <input
                type="text"
                name="company"
                placeholder="e.g. Google"
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
                placeholder="e.g. Software Engineer Intern"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* LOCATION */}

            <div>

              <label className="block font-semibold mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Bangalore"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* STATUS */}

            <div>

              <label className="block font-semibold mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >

                <option value="Applied">
                  Applied
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Offer">
                  Offer
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

            {/* JOB URL */}

            <div>

              <label className="block font-semibold mb-2">
                Job URL
              </label>

              <input
                type="url"
                name="jobUrl"
                placeholder="https://..."
                value={formData.jobUrl}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* DATE */}

            <div>

              <label className="block font-semibold mb-2">
                Application Date
              </label>

              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* NOTES */}

            <div className="md:col-span-2">

              <label className="block font-semibold mb-2">
                Notes
              </label>

              <textarea
                rows="4"
                name="notes"
                placeholder="Add interview details, recruiter information, preparation notes, etc."
                value={formData.notes}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={adding}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl py-3 md:col-span-2 font-semibold"
            >
              {adding
                ? "Adding Application..."
                : "➕ Add Job Application"}
            </button>

          </form>

        </div>

        {/* ======================================
            APPLICATIONS
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                📋 My Applications
              </h2>

              <p className="text-gray-500 mt-1">
                {filteredJobs.length} application
                {filteredJobs.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

            {/* SEARCH */}

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="Search company, role..."
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

              <div className="text-4xl mb-3">
                ⏳
              </div>

              <p className="font-semibold">
                Loading applications...
              </p>

            </div>

          ) : filteredJobs.length === 0 ? (

            <div className="text-center py-16 bg-gray-50 rounded-xl">

              <div className="text-5xl mb-4">
                💼
              </div>

              <h3 className="text-xl font-bold">
                No applications found
              </h3>

              <p className="text-gray-500 mt-2">
                Add a job application or change
                your search filters.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredJobs.map((job) => (

                <div
                  key={job._id}
                  className="border rounded-2xl p-6 hover:shadow-md transition"
                >

                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                    {/* JOB DETAILS */}

                    <div className="flex-1">

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                        <div>

                          <h3 className="text-2xl font-bold">
                            {job.company}
                          </h3>

                          <p className="text-lg text-gray-700 mt-1">
                            {job.role}
                          </p>

                        </div>

                        <span
                          className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>

                      </div>

                      {/* LOCATION */}

                      {job.location && (
                        <p className="text-gray-500 mt-3">
                          📍 {job.location}
                        </p>
                      )}

                      {/* DATE */}

                      {job.applicationDate && (
                        <p className="text-gray-500 mt-1">
                          📅{" "}
                          {new Date(
                            job.applicationDate
                          ).toLocaleDateString()}
                        </p>
                      )}

                      {/* NOTES */}

                      {job.notes && (
                        <div className="mt-4 bg-gray-50 rounded-xl p-4">

                          <p className="text-sm font-semibold mb-1">
                            Notes
                          </p>

                          <p className="text-gray-600 whitespace-pre-wrap">
                            {job.notes}
                          </p>

                        </div>
                      )}

                      {/* JOB URL */}

                      {job.jobUrl && (
                        <a
                          href={job.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          🔗 View Job →
                        </a>
                      )}

                      {/* STATUS */}

                      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">

                        <label className="font-semibold">
                          Update Status:
                        </label>

                        <select
                          value={job.status}
                          onChange={(e) =>
                            handleStatusChange(
                              job._id,
                              e.target.value
                            )
                          }
                          className="border rounded-lg px-3 py-2 w-fit"
                        >

                          <option value="Applied">
                            Applied
                          </option>

                          <option value="Interview">
                            Interview
                          </option>

                          <option value="Offer">
                            Offer
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                        </select>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex lg:flex-col gap-3">

                      <button
                        onClick={() =>
                          handleDelete(job._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold"
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </MainLayout>
  );
}

export default JobTracker;