// src/services/apiClient.js
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

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

  // Token desde store
  let token = state?.token;

  // Fallback storage (por refresh)
  if (!token) {
    token = localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  return token || null;
}

function handleUnauthorized() {
  const state = useAuthStore.getState();

  // Limpia sesión usando tu acción real
  if (state?.onLogout) state.onLogout();

  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

function formatError(error) {
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
    error.firstErrorMessage = allMessages[0] || data.title || 'Error';
  } else {
    error.firstErrorMessage = data.title || data.message || 'Error';
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
  (error) => Promise.reject(error)
);

// =============================
// Interceptor de RESPONSE (Auth)
// =============================
authApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (import.meta.env.DEV) {
      console.error('[AUTH RESPONSE ERROR]', {
        status,
        url,
        message: error.message,
        data: error.response?.data,
      });
    }

    if (status === 401 && !url?.includes('/authenticate')) {
      handleUnauthorized();
    }

    throw formatError(error);
  }
);

export { authApiClient };
