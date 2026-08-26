import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/placements`,
});

const getToken = () => {
  return localStorage.getItem("token");
};

// ========================================
// Get Placements
// ========================================

export const getPlacements = () => {
  return API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// ========================================
// Add Placement
// ========================================

export const addPlacement = (data) => {
  return API.post("/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
};

// ========================================
// Update Placement
// ========================================

export const updatePlacement = (id, data) => {
  return API.put(`/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
};

// ========================================
// Delete Placement
// ========================================

export const deletePlacement = (id) => {
  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default API;