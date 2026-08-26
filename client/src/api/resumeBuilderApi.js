import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/resume-builder`,
});

const getToken = () => {
  return localStorage.getItem("token");
};

// ==============================
// Get Resume
// ==============================
export const getResume = () => {
  return API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ==============================
// Save Resume
// ==============================
export const saveResume = (data) => {
  return API.post("/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ==============================
// Delete Resume
// ==============================
export const deleteResume = () => {
  return API.delete("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default API;