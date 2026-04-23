import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Set up axios defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new student
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  // Login student
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  // Get student details
  getStudent: async () => {
    const response = await api.get('/student');
    return response.data;
  },

  // Update password
  updatePassword: async (passwordData) => {
    const response = await api.put('/update-password', passwordData);
    return response.data;
  },

  // Update course
  updateCourse: async (courseData) => {
    const response = await api.put('/update-course', courseData);
    return response.data;
  },
};

export default api;
