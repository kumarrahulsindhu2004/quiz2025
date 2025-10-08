import axios from "axios";

// ✅ Base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // for cookies if needed
});

// ✅ Automatically attach token to requests
API.interceptors.request.use(
  (config) => {
    try {
      const tokenString = localStorage.getItem("token");
      // ✅ Only parse if tokenString is truthy AND not the string "undefined"
      const token = tokenString && tokenString !== "undefined" ? JSON.parse(tokenString) : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("Request config:", config); // DEBUG
      return config;
    } catch (err) {
      console.error("Error reading token from localStorage:", err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);





// ✅ Handle expired tokens or 401s
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Clearing localStorage and redirecting to login.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ✅ API endpoints
export const loginUser = (data) => API.post("/user/login", data);
export const registerUser = (data) => API.post("/user/register", data);

export default API;
