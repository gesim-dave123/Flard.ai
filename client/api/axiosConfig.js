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
    headers:{'Content-Type': 'mapplication/json',
    },
    timeout: 10000,
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

export default axiosInstance;

