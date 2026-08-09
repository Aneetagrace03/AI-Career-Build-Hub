import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/roadmap",
});

// ===============================
// Get Token
// ===============================
const getToken = () => {
  return localStorage.getItem("token");
};

// ===============================
// Generate Learning Roadmap
// ===============================
export const generateRoadmap = async (career, level) => {
  return API.post(
    "/generate",
    {
      career,
      level,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// ===============================
// Get Roadmap History
// ===============================
export const getRoadmapHistory = async () => {
  return API.get("/history", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ===============================
// Delete Roadmap
// ===============================
export const deleteRoadmap = async (id) => {
  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default API;