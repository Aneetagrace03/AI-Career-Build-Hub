import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/dashboard`,
});

const getToken = () => {
  return localStorage.getItem("token");
};

// =====================================
// Get Dashboard Statistics
// =====================================
export const getDashboardStats = async () => {
  return API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default API;