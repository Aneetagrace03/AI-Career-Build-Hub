import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/dashboard",
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