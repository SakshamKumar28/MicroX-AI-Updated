import axios from 'axios';

// Create api instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // Uses VITE_API_URL if available, else localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        // Save token
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const signupUser = async (name, email, password) => {
    try {
        const response = await api.post('/auth/signup', { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file); // Python backend expects 'file'

    try {
        const response = await api.post('/images/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
         throw error.response ? error.response.data : error;
    }
}

export const analyzeImage = async (imageId) => {
    try {
        const response = await api.post(`/images/${imageId}/analyze`);
        return response.data;
    } catch (error) {
         throw error.response ? error.response.data : error;
    }
}

export const getImages = async () => {
    try {
        const response = await api.get('/images/');
        return response.data;
    } catch (error) {
         throw error.response ? error.response.data : error;
    }
}

export default api;
