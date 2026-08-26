import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/interview`,
});

// ==============================
// Generate Interview Question
// ==============================

export const generateQuestion = async (role, difficulty) => {
  return await API.post("/generate", {
    role,
    difficulty,
  });
};

// ==============================
// Evaluate Interview Answer
// ==============================

export const evaluateAnswer = async (question, answer) => {
  return await API.post("/evaluate", {
    question,
    answer,
  });
};

export default API;