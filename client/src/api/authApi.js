import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User
export const registerUser = async (userData) => {
  return await API.post("/auth/register", userData);
};

// Login User
export const loginUser = async (userData) => {
  return await API.post("/auth/login", userData);
};

// Export API instance (for future authenticated requests)
export default API;