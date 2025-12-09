import axios from "axios";
console.log("🔥 API BASE URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  withCredentials: true, // sends cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors for error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
