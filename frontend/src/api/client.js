import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (username, email, password) => axios.post(`${API_URL}/register`, { username, email, password });
export const loginUser = (email, password) => axios.post(`${API_URL}/login`, { email, password });
export const saveUserProfile = (userId, profileData) => axios.post(`${API_URL}/profile`, { userId, profileData });
export const generateAIPlan = (userId) => axios.post(`${API_URL}/generate-plan`, { userId });
export const logUserProgress = (userId, logData) => axios.post(`${API_URL}/log-progress`, { userId, logData });