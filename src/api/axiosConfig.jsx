import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "https://localhost:8080", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");
    console.log("TOKEN:", token);
    if (token) {
      // If token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Return the modified config
    return config;
  },
  (error) => {
    // If the request fails, handle it here
    return Promise.reject(error);
  }
);

// Add response interceptor (optional, in case you need to handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response error globally (e.g., if unauthorized, log out the user)
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, clear localStorage or handle the error
      localStorage.removeItem("authToken");
      // Optionally, redirect the user to login
    }
    return Promise.reject(error);
  }
);

export default api;
