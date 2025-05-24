import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add custom headers here, like authentication tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      // For example, redirect to login page or refresh token
    }
    return Promise.reject(error);
  }
);

export default api;
