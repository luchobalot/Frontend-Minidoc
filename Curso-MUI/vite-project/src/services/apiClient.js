// src/services/apiClient.js
import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

// API DE AUTENTICACION JWT
const authApiClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL || '/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})


// INTERCEPTOR DE REQUEST (AUTH)
authApiClient.interceptors.request.use(
  (config) => {
    // Obtener token valido desde Zustand
    const token = useAuthStore.getState().getValidToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log solo en desarrollo
    if (import.meta.env.DEV) {
      console.log('AUTH API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('Auth Request Error:', error);
    return Promise.reject(error);
  }
);

// INTERCEPTOR DE RESPONSE (AUTH)
authApiClient.interceptors.response.use(
  (response) => {
    // Log solo en desarrollo
    if (import.meta.env.DEV) {
      console.log('AUTH API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // Log del error
    console.error('AUTH API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    
    // Si el error es 401 (no autorizado), cerrar sesion
    if (error.response?.status === 401) {
      const isAuthReady = useAuthStore.getState().isAuthReady;
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      
      // Solo hacer logout si el store ya esta listo y el usuario estaba autenticado
      // Evita logout durante el login inicial
      if (isAuthReady && isAuthenticated && !error.config.url.includes('/authenticate')) {
        console.warn('Token invalido o expirado, cerrando sesion');
        useAuthStore.getState().logout();
        
        // Redirigir al login si estamos en el navegador
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    
    // Transformar errores
    if (error.response?.data) {
      const errorData = error.response.data;
      
      if (errorData.errors) {
        const formattedErrors = {};
        const allMessages = [];
        
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          const messageArray = Array.isArray(messages) ? messages : [messages];
          formattedErrors[field] = messageArray;
          allMessages.push(...messageArray);
        });
        
        error.formattedErrors = formattedErrors;
        error.errorMessages = allMessages;
        error.firstErrorMessage = allMessages[0] || errorData.title || 'Error de autenticacion';
      } else if (errorData.title) {
        error.firstErrorMessage = errorData.title;
      } else if (errorData.message) {
        error.firstErrorMessage = errorData.message;
      }
    }
    
    return Promise.reject(error);
  }
);

export { authApiClient };