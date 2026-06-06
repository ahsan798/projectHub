import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor — attach token ───────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('ph_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response interceptor — handle 401 ───────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('ph_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// ─── Mock delay helper (simulates real network latency) ───────────────────────
export const mockDelay = (ms = 400): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default axiosInstance;
