import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  status: 'not-authenticated',
  user: {},
  token: undefined,
  errorMessage: undefined,

  // Acción para cuando iniciamos el proceso de verificación
  onChecking: () =>
    set({
      status: 'checking',
      user: {},
      errorMessage: undefined,
    }),

  onLogin: (user, token) =>
    set(() => {
      // Persistencia simple
      try {
        if (token) localStorage.setItem('token', token);
      } catch {}

      return {
        status: 'authenticated',
        token: token,
        user: user,
        errorMessage: undefined,
      };
    }),

  onLogout: (errorMessage = undefined) =>
    set(() => {
      try {
        localStorage.removeItem('token');
      } catch {}

      return {
        status: 'not-authenticated',
        token: undefined,
        user: {},
        errorMessage: errorMessage,
      };
    }),

  clearErrorMessage: () => set({ errorMessage: undefined }),
}));
