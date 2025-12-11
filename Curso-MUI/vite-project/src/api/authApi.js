// src/api/authApi.js
import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
import { useAuthStore } from '../stores/useAuthStore'; 

const { VITE_BFF_MINIDOC_URL } = getEnvVariables();

// Se conecta a http://localhost:5163/api
export const authApi = axios.create({
    baseURL: VITE_BFF_MINIDOC_URL, 
});

// Interceptor para inyectar el token (Bearrer) en las peticiones al BFF
authApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});