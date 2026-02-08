import axios from 'axios';
import backendConnection from './backendConnection.js';

//helper function incase backend connection returns undefined
const getBackendURL = () => {
    return backendConnection() || 'http://localhost:5000';
};

//crate an axios intance with default settings
const axiosInstance = axios.create({
    baseURL: getBackendURL(),
    withCredentials: true,
    headers:{'Content-Type': 'application/json',
    },
    timeout: 30000,
});

//list all the publid endpoints that has no authentications
const publicEndpoint = [
    'api/auth/login',
];


//request inteceptor to add auth token to headers

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("URL:", config.url);
        
        const isPublicEndpoint = publicEndpoint.some((endpoint) =>
            config.url?.includes(endpoint)
        );

        const hasManualAuthHeader = config.headers.Authorization;

        if (!isPublicEndpoint && !hasManualAuthHeader){
            const token = localStorage.getItem('authToken');
            if(token){
                config.headers.Authorization = 'Bearer ${token}';
            }
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);
// Response interceptor - handles errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status code outside 2xx triggers this function

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        sessionStorage.removeItem("auth_token");

      }
      // Handle 403 Forbidden
      if (status === 403) {
        console.error("Access forbidden");
      }

      if (status === 500) {
        console.error("Server error occurred");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("No response from server");
    } else {
      // Something else happened
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

