import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // crucial for cookies
});

// Simplified: rely on backend cookies, not localStorage tokens
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Avoid infinite loop: if the refresh endpoint fails, do not retry
    if (originalRequest?.url === "/api/auth/refresh") {
      return Promise.reject(error);
    }

    // 2. Only retry once and only for 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosClient.post("/api/auth/refresh");
        return axiosClient(originalRequest);
      } catch (e) {
        console.error("Token refresh failed:", e);
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosClient;
