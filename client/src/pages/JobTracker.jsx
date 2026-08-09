import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import JobStats from "../components/jobs/JobStats";

import {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../api/jobApi";

function JobTracker() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    notes: "",
  });

  // ==========================
  // Load Jobs
  // ==========================

  const loadJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Add Job
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addJob({
        user: user.id,
        ...formData,
      });

      alert("✅ Job Added Successfully!");

      setFormData({
        company: "",
        role: "",
        location: "",
        status: "Applied",
        notes: "",
      });

      loadJobs();
    } catch (error) {
      console.error(error);
      alert("Failed to add job.");
    }
  };

  // ==========================
  // Update Status
  // ==========================

  const handleStatusChange = async (id, status) => {
    try {
      await updateJob(id, { status });

      loadJobs();
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    }
  };

  // ==========================
  // Delete Job
  // ==========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      alert("Job deleted successfully!");

      loadJobs();
    } catch (error) {
      console.error(error);
      alert("Failed to delete job.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          💼 Job Tracker
        </h1>

        {/* Statistics */}
        <JobStats jobs={jobs} />

        {/* Add Job */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Add New Job
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Job Role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <textarea
              rows="4"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="border rounded-xl p-3 md:col-span-2"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 md:col-span-2"
            >
              Add Job
            </button>

          </form>

        </div>

        {/* Job List */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            My Applications
          </h2>

          {jobs.length === 0 ? (
            <p className="text-gray-500">
              No job applications found.
            </p>
          ) : (
            <div className="space-y-5">

              {jobs.map((job) => (

                <div
                  key={job._id}
                  className="border rounded-xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center"
                >

                  <div>

                    <h3 className="text-2xl font-bold">
                      {job.company}
                    </h3>

                    <p className="text-lg">
                      {job.role}
                    </p>

                    <p className="text-gray-500">
                      📍 {job.location}
                    </p>

                    <p className="mt-2 text-gray-600">
                      {job.notes}
                    </p>

                    <div className="mt-4">

                      <label className="font-semibold mr-2">
                        Status:
                      </label>

                      <select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(
                            job._id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                      >
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                      </select>

                    </div>

                  </div>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl mt-5 lg:mt-0"
                  >
                    Delete
                  </button>

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