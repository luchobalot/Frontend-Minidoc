// src/services/apiClient.js
import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

// =======================
// Configuración base Axios
// =======================
const authApiClient = axios.create({
  baseURL: import.meta.env.VITE_BFF_MINIDOC_URL || '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ========
// Helpers
// ========

function getAuthToken() {
  const state = useAuthStore.getState();
  
  // Intentar obtener token del store
  let token = state.token;
  
  // Si no está en el store, intentar de localStorage o sessionStorage
  if (!token) {
    token = localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  
  // Verificar si está expirado
  if (token && state.isTokenExpired && state.isTokenExpired()) {
    console.warn('[apiClient] Token expirado');
    state.logout();
    return null;
  }
  
  return token || null;
}

function handleUnauthorized() {
  // Cierra sesión y redirige al /login
  const { isAuthReady, isAuthenticated, logout } = useAuthStore.getState();
  if (isAuthReady && isAuthenticated) {
    logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}

function formatError(error) {
  // Normaliza la forma del error para la UI
  const data = error.response?.data;
  if (!data) return error;

  if (data.errors) {
    const formattedErrors = {};
    const allMessages = [];
    for (const [field, messages] of Object.entries(data.errors)) {
      const list = Array.isArray(messages) ? messages : [messages];
      formattedErrors[field] = list;
      allMessages.push(...list);
    }
    error.formattedErrors = formattedErrors;
    error.errorMessages = allMessages;
    error.firstErrorMessage = allMessages[0] || data.title || 'Error de autenticación';
  } else {
    error.firstErrorMessage = data.title || data.message || 'Error desconocido';
  }
  return error;
}

// =============================
// Interceptor de REQUEST (Auth)
// =============================
authApiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (import.meta.env.DEV) {
      console.log(`[AUTH REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('[AUTH REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// =============================
// Interceptor de RESPONSE (Auth)
// =============================
authApiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[AUTH RESPONSE] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    console.error('[AUTH RESPONSE ERROR]', {
      status,
      url,
      message: error.message,
      data: error.response?.data,
    });

    // 401 que no sea el /authenticate => sesión inválida/expirada
    if (status === 401 && !url?.includes('/authenticate')) {
      handleUnauthorized();
    }

    // Normaliza y propaga el error
    throw formatError(error);
  }
);

export { authApiClient };
