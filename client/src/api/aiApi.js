import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const analyzeResume = async (formData) => {
  return API.post("/ai/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default API;