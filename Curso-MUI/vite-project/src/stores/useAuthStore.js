// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      tokenExpiry: null,
      isAuthReady: false,

      login: (userData = {}, token = null, tokenExpiry = null) => {
        console.log('[useAuthStore] login() ejecutado:', userData);
        
        // Guardar token en localStorage separadamente
        if (token) {
          localStorage.setItem('token', token);
        }
        if (tokenExpiry) {
          localStorage.setItem('tokenExpiration', tokenExpiry);
        }
        
        set({
          isAuthenticated: true,
          user: userData,
          token: token,
          tokenExpiry: tokenExpiry,
        });
      },

      logout: () => {
        console.log('[useAuthStore] logout() ejecutado, sesion cerrada');
        
        // CRÍTICO: Eliminar token del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        
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
          // Intentar recuperar del localStorage
          const storedToken = localStorage.getItem('token');
          if (storedToken) {
            return storedToken;
          }
          return null;
        }
        
        if (isTokenExpired()) {
          console.warn('[useAuthStore] Token expirado, cerrando sesion');
          logout();
          return null;
        }
        
        return token;
      },

      setAuthReady: (value) => {
        console.log(`[useAuthStore] isAuthReady: ${value}`);
        set({ isAuthReady: value });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // Solo persistir estos campos, NO el token
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        tokenExpiry: state.tokenExpiry,
        isAuthReady: state.isAuthReady,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('[useAuthStore] Store hidratado desde localStorage');
          
          // Recuperar token del localStorage
          const token = localStorage.getItem('token');
          const tokenExpiration = localStorage.getItem('tokenExpiration');
          
          if (token) {
            state.token = token;
            state.tokenExpiry = tokenExpiration;
          }
          
          // Verificar si el token expiro al cargar
          if (state.isTokenExpired()) {
            console.warn('[useAuthStore] Token expirado detectado al hidratar');
            state.logout();
          }
          
          state.setAuthReady(true);
        }
      },
    }
  )
);

export default useAuthStore;