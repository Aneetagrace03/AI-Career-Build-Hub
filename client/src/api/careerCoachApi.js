import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/career-coach",
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