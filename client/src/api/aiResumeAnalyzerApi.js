import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ai",
});

const getToken = () => {
  return localStorage.getItem("token");
};

export const analyzeResume = (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  return API.post("/analyze", formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export default API;