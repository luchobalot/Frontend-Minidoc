// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let expirationCheckInterval = null;
let expirationWarningShown = false;

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      tokenExpiry: null,
      isAuthReady: false,
      rememberMe: false,

      login: (userData = {}, token = null, tokenExpiry = null, rememberMe = false) => {
        console.log('[useAuthStore] login() ejecutado:', userData);
        
        // Guardar token en localStorage separadamente
        if (token) {
          if (rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('rememberMe', 'true');
          } else {
            sessionStorage.setItem('token', token);
            localStorage.removeItem('rememberMe');
          }
        }
        
        if (tokenExpiry) {
          if (rememberMe) {
            localStorage.setItem('tokenExpiration', tokenExpiry);
          } else {
            sessionStorage.setItem('tokenExpiration', tokenExpiry);
          }
        }
        
        set({
          isAuthenticated: true,
          user: userData,
          token: token,
          tokenExpiry: tokenExpiry,
          rememberMe: rememberMe,
        });

        // Iniciar monitor de expiracion
        get().startExpirationMonitor();
      },

      logout: () => {
        console.log('[useAuthStore] logout() ejecutado, sesion cerrada');
        
        // Detener monitor de expiracion
        get().stopExpirationMonitor();
        
        // Eliminar token de localStorage Y sessionStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiration');
        
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          tokenExpiry: null,
        });
      },

      isTokenExpired: () => {
        const { tokenExpiry } = get();
        
        if (!tokenExpiry) {
          return false;
        }
        
        const expiryDate = new Date(tokenExpiry);
        const now = new Date();
        
        return now >= expiryDate;
      },

      getValidToken: () => {
        const { token, isTokenExpired, logout } = get();
        
        if (!token) {
          // Intentar recuperar del localStorage o sessionStorage
          const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
          if (storedToken) {
            return storedToken;
          }
          return null;
        }
        
        if (isTokenExpired()) {
          console.warn('[useAuthStore] Token expirado, cerrando sesion');
          logout();
          
          // Redirigir al login
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          
          return null;
        }
        
        return token;
      },

      setAuthReady: (value) => {
        console.log(`[useAuthStore] isAuthReady: ${value}`);
        set({ isAuthReady: value });
      },

      startExpirationMonitor: () => {
        const { tokenExpiry, logout, isTokenExpired } = get();
        
        // Limpiar intervalo anterior si existe
        if (expirationCheckInterval) {
          clearInterval(expirationCheckInterval);
        }

        // Resetear flag de advertencia
        expirationWarningShown = false;
        
        if (!tokenExpiry) {
          console.warn('[useAuthStore] No hay tokenExpiry, no se inicia monitor');
          return;
        }
        
        console.log('[useAuthStore] Monitor de expiracion iniciado');
        
        expirationCheckInterval = setInterval(() => {
          const { tokenExpiry, isTokenExpired } = get();
          
          if (!tokenExpiry) {
            clearInterval(expirationCheckInterval);
            return;
          }
          
          const now = new Date();
          const expiry = new Date(tokenExpiry);
          const timeLeft = expiry - now;
          const fiveMinutes = 5 * 60 * 1000;
          
          // Advertir 5 minutos antes de que expire
          if (timeLeft < fiveMinutes && timeLeft > 0 && !expirationWarningShown) {
            expirationWarningShown = true;
            const minutesLeft = Math.floor(timeLeft / 60000);
            
            console.warn(`[useAuthStore] Tu sesion expira en ${minutesLeft} minutos`);
            
            // Disparar evento personalizado para mostrar advertencia en UI
            window.dispatchEvent(new CustomEvent('auth:expiring-soon', {
              detail: { minutesLeft }
            }));
          }
          
          // Si expiro, hacer logout y redirigir
          if (isTokenExpired()) {
            console.error('[useAuthStore] Token expirado detectado por monitor');
            logout();
            
            if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
            
            clearInterval(expirationCheckInterval);
          }
        }, 30000); // Verificar cada 30 segundos
      },

      stopExpirationMonitor: () => {
        if (expirationCheckInterval) {
          console.log('[useAuthStore] Monitor de expiracion detenido');
          clearInterval(expirationCheckInterval);
          expirationCheckInterval = null;
        }
        expirationWarningShown = false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Solo persistir estos campos
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        tokenExpiry: state.tokenExpiry,
        isAuthReady: state.isAuthReady,
        rememberMe: state.rememberMe,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('[useAuthStore] Store hidratado desde localStorage');
          
          // Recuperar token del localStorage o sessionStorage segun rememberMe
          const rememberMe = localStorage.getItem('rememberMe') === 'true';
          const token = rememberMe 
            ? localStorage.getItem('token')
            : sessionStorage.getItem('token');
          const tokenExpiration = rememberMe
            ? localStorage.getItem('tokenExpiration')
            : sessionStorage.getItem('tokenExpiration');
          
          if (token) {
            state.token = token;
            state.tokenExpiry = tokenExpiration;
            state.rememberMe = rememberMe;
          }
          
          // Verificar si el token expiro al cargar
          if (state.isTokenExpired()) {
            console.warn('[useAuthStore] Token expirado detectado al hidratar');
            state.logout();
          } else if (state.isAuthenticated && token) {
            // Si hay sesion valida, iniciar monitor
            state.startExpirationMonitor();
          }
          
          state.setAuthReady(true);
        }
      },
    }
  )
);

export default useAuthStore;