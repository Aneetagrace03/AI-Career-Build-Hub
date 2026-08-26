import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

// ==========================================
// Register
// ==========================================

export const registerUser = (data) => {
  return API.post("/register", data);
};

// ==========================================
// Login
// ==========================================

export const loginUser = (data) => {
  return API.post("/login", data);
};

// ==========================================
// Forgot Password
// ==========================================

export const forgotPassword = (email) => {
  return API.post("/forgot-password", {
    email,
  });
};

// ==========================================
// Reset Password
// ==========================================

export const resetPassword = (
  token,
  password
) => {
  return API.post(
    `/reset-password/${token}`,
    {
      password,
    }
  );
};

export default API;