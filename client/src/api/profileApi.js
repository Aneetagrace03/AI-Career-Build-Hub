import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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