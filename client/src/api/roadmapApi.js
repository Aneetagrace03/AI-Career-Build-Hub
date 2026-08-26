import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/roadmap`,
});

const getToken = () => {
  return localStorage.getItem("token");
};

// Generate roadmap
export const generateRoadmap = (career, level) => {
  return API.post(
    "/generate",
    {
      career,
      level,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// Get roadmap history
export const getRoadmapHistory = () => {
  return API.get("/history", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Delete roadmap
export const deleteRoadmap = (id) => {
  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default API;