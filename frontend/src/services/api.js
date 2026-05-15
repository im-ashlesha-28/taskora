import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://taskora-tw6q.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

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
