import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',  // Your Spring Boot backend URL
    headers: { 'Content-Type': 'application/json' },
});

// Add JWT interceptor for auth
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;