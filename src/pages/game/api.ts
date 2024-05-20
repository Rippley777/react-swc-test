import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; // URL of the Gateway/Proxy Service

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
