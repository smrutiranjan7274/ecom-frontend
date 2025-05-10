import axios, { type AxiosInstance } from 'axios';

/**
 * Axios instance configured for the e-commerce API
 * Handles all HTTP requests to the backend server
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',  // Spring Boot backend URL
    headers: { 'Content-Type': 'application/json' },
});

/**
 * Request interceptor that adds JWT authentication token
 * Gets token from localStorage and adds it to Authorization header
 */
// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default apiClient;