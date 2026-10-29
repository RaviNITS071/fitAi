import axios from 'axios';

// API Base URL from Vite environment variable or local development fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Automatically attach JWT token to every request if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('fitai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Authentication APIs
export const registerUser = (username, email, password) => 
  api.post('/register', { username, email, password });

export const loginUser = (email, password) => 
  api.post('/login', { email, password });

export const googleAuthLogin = (credential) => 
  api.post('/auth/google', { credential });

// Profile & Progress APIs
export const saveUserProfile = (userId, profileData) => 
  api.post('/profile', { userId, ...profileData });

export const generateAIPlan = (userId) => 
  api.post('/generate-plan', { userId });

export const logUserProgress = (userId, logData) => 
  api.post('/log-progress', { userId, logData });

// AI Chatbot API
export const chatWithAI = (userId, message) => 
  api.post('/chat', { userId, message });

// RAG Pipeline APIs (GenAI Interview Pipeline)
export const answerRAGQuestion = (question, goal) => 
  api.post('/ai/answer', { question, goal });

export const getCorpusKnowledge = () => 
  api.get('/ai/corpus');

export const triggerCorpusIngestion = () => 
  api.post('/ai/ingest');

export default api;