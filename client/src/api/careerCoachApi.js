import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/career-coach`,
});

const getToken = () => localStorage.getItem("token");

export const askCareerCoach = (question) => {
  return API.post(
    "/chat",
    { question },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export default API;