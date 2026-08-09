import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/placements",
});

// Get JWT Token
const getToken = () => {
  return localStorage.getItem("token");
};

// ================================
// Get All Placements
// ================================
export const getPlacements = async () => {
  return API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ================================
// Add Placement
// ================================
export const addPlacement = async (data) => {
  return API.post("/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ================================
// Update Placement
// ================================
export const updatePlacement = async (id, data) => {
  return API.put(`/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ================================
// Delete Placement
// ================================
export const deletePlacement = async (id) => {
  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default API;