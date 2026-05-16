import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskora_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
};

export const taskService = {
  getTasks: () => api.get('/tasks'),
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  postponeTask: (id, currentCount) => api.put(`/tasks/${id}`, { postpone_count: currentCount + 1, status: 'pending' }),
};

export const recommendationService = {
  getRecommendations: (energy, time) => api.post('/recommend', { current_energy: energy, available_time: time }),
};

export const reflectionService = {
  getReflections: () => api.get('/reflections'),
  createReflection: (reflection) => api.post('/reflection', reflection),
};

export const analyticsService = {
  getSummary: () => api.get('/analytics'),
};

export default api;
