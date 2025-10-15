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

      /**
       * Login - Guarda usuario y token en el store
       * @param {Object} userData - Datos del usuario
       * @param {string} token - Token JWT
       * @param {string} tokenExpiry - Fecha de expiracion del token (opcional)
       */
      login: (userData = {}, token = null, tokenExpiry = null) => {
        console.log('[useAuthStore] login() ejecutado:', userData);
        set({
          isAuthenticated: true,
          user: userData,
          token: token,
          tokenExpiry: tokenExpiry,
        });
      },

      /**
       * Logout - Limpia la sesion
       */
      logout: () => {
        console.log('[useAuthStore] logout() ejecutado, sesion cerrada');
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          tokenExpiry: null,
        });
      },

      /**
       * Verifica si el token ha expirado
       * @returns {boolean}
       */
      isTokenExpired: () => {
        const { tokenExpiry } = get();
        
        if (!tokenExpiry) {
          return false;
        }
        
        const expiryDate = new Date(tokenExpiry);
        const now = new Date();
        
        return now >= expiryDate;
      },

      /**
       * Obtiene el token actual si es valido
       * @returns {string|null}
       */
      getValidToken: () => {
        const { token, isTokenExpired, logout } = get();
        
        if (!token) {
          return null;
        }
        
        if (isTokenExpired()) {
          console.warn('[useAuthStore] Token expirado, cerrando sesion');
          logout();
          return null;
        }
        
        return token;
      },

      /**
       * Marca el store como listo (despues de hidratar)
       */
      setAuthReady: (value) => {
        console.log(`[useAuthStore] isAuthReady: ${value}`);
        set({ isAuthReady: value });
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('[useAuthStore] Store hidratado desde localStorage');
          
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