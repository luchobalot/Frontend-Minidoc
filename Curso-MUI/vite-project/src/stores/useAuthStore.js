// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isAuthReady: false,

      login: (userData = {}, token = null) => {
        console.log('✅ [useAuthStore] login() ejecutado:', userData);
        set({
          isAuthenticated: true,
          user: userData,
          token: token,
        });
      },

      logout: () => {
        console.log('🚪 [useAuthStore] logout() ejecutado, sesión cerrada');
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },

      setAuthReady: (value) => {
        console.log(`🟡 [useAuthStore] isAuthReady → ${value}`);
        set({ isAuthReady: value });
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.setAuthReady(true);
      },
    }
  )
);

export default useAuthStore;
