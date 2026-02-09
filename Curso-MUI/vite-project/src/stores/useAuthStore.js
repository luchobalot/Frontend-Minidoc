// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      status: 'not-authenticated',
      user: {},
      token: undefined,
      errorMessage: undefined,

      onChecking: () =>
        set({
          status: 'checking',
          user: {},
          errorMessage: undefined,
        }),

      onLogin: (user, token) =>
        set(() => ({
          status: 'authenticated',
          token: token,
          user: user, // ✅ guardamos el objeto usuario también
          errorMessage: undefined,
        })),

      onLogout: (errorMessage = undefined) =>
        set(() => ({
          status: 'not-authenticated',
          token: undefined,
          user: {},
          errorMessage: errorMessage,
        })),

      clearErrorMessage: () => set({ errorMessage: undefined }),
    }),
    {
      name: 'minidoc-auth', // ✅ key en localStorage
      partialize: (state) => ({
        status: state.status,
        token: state.token,
        user: state.user,
      }),
    }
  )
);
