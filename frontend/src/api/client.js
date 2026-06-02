import axios from 'axios';

// Development URL (Use this for local testing in VS Code)
//const API_URL = "http://localhost:5000/api";

// Production URL (Uncomment this jab aap naya backend Render par deploy kar do)
 const API_URL = "https://fitai-backend-8v70.onrender.com/api";

export const registerUser = (username, email, password) => axios.post(`${API_URL}/register`, { username, email, password });
export const loginUser = (email, password) => axios.post(`${API_URL}/login`, { email, password });
export const saveUserProfile = (userId, profileData) => axios.post(`${API_URL}/profile`, { userId, profileData });
export const generateAIPlan = (userId) => axios.post(`${API_URL}/generate-plan`, { userId });
export const logUserProgress = (userId, logData) => axios.post(`${API_URL}/log-progress`, { userId, logData });

// Add this with your other API calls
export const chatWithAI = (userId, message) => axios.post(`${API_URL}/chat`, { userId, message });