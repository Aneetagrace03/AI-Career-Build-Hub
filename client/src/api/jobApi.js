import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ==============================
// Add Job
// ==============================

export const addJob = async (jobData) => {
  return await API.post("/jobs", jobData);
};

// ==============================
// Get All Jobs
// ==============================

export const getJobs = async () => {
  return await API.get("/jobs");
};

// ==============================
// Update Job
// ==============================

export const updateJob = async (id, jobData) => {
  return await API.put(`/jobs/${id}`, jobData);
};

// ==============================
// Delete Job
// ==============================

export const deleteJob = async (id) => {
  return await API.delete(`/jobs/${id}`);
};

export default API;