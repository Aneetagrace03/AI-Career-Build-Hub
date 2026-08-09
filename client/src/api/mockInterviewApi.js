import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/mock-interview",
});

const getToken = () => {
  return localStorage.getItem("token");
};

// ==========================================
// START INTERVIEW
// ==========================================

export const startInterview = (role, difficulty) => {
  return API.post(
    "/start",
    {
      role,
      difficulty,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// ==========================================
// EVALUATE ANSWER
// ==========================================

export const evaluateAnswer = (
  role,
  difficulty,
  question,
  answer
) => {
  return API.post(
    "/evaluate",
    {
      role,
      difficulty,
      question,
      answer,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export default API;