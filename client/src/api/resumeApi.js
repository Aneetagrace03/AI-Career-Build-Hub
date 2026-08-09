import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadResume = async (formData) => {
  return API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getResume = async (userId) => {
  return API.get(`/resume/${userId}`);
};

export default API;