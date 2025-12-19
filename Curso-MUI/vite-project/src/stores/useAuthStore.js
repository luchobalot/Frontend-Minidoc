import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    status: 'not-authenticated',
    user: {},
    token: undefined,
    errorMessage: undefined,

    // Acción para cuando iniciamos el proceso de verificación
    onChecking: () => set({ 
        status: 'checking', 
        user: {}, 
        errorMessage: undefined 
    }),

    onLogin: (user, token) => set({
        status: 'authenticated',
        token: token,
        user: user, 
        errorMessage: undefined
    }),

    onLogout: (errorMessage = undefined) => set({
        status: 'not-authenticated',
        token: undefined,
        user: {},
        errorMessage: errorMessage
    }),
    
    clearErrorMessage: () => set({ errorMessage: undefined })
}));