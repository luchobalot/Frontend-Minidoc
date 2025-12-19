import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_BFF_MINIDOC_URL } = getEnvVariables();

const authApi = axios.create({
    baseURL: VITE_BFF_MINIDOC_URL, // Asegurate que esta variable en tu .env apunte a tu nuevo BFF
});

// Interceptor: Inyectar el token en cada petición
authApi.interceptors.request.use(config => {
    
    const token = localStorage.getItem('token');
    
    if ( token ) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}` // Estándar JWT
        }
    }
    
    return config;
});

export default authApi;