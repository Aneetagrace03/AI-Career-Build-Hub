import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Save Profile
export const saveProfile = async (profileData) => {
  return API.post("/profile", profileData);
};

// Get Profile
export const getProfile = async (userId) => {
  return API.get(`/profile/${userId}`);
};

export default API;