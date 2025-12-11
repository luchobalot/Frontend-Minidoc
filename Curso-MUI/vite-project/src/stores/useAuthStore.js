import { create } from 'zustand';
import { getEnvVariables } from '../helpers/getEnvVariables';

// Estado inicial definido para la nueva lógica
const initialState = {
    status: 'not-authenticated', // 'checking', 'authenticated', 'not-authenticated'
    token: null,
    tokenFechaExpiracion: null,
    userId: null,
    firstName: null,
    lastName: null,
    logon: null,
    password: null,
    email: null,
    organization: null,
    serviceNumber: null,
    contactNumber: null,
    rank: null,
    unit: null,
    accessRights: null,
    errorMessage: null,
    autoRefreshTimerId: null,
};

export const useAuthStore = create((set, get) => ({
    ...initialState,
    
    // Acciones requeridas por useAuth.js
    checking: () => set({ ...initialState, status: 'checking' }),
    
    onLogin: (payload) => {
        set(() => ({
            status: 'authenticated',
            token: payload.token,
            tokenFechaExpiracion: payload.tokenFechaExpiracion,
            userId: payload.userId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            logon: payload.logon,
            password: payload.password,
            email: payload.email,
            organization: payload.organization,
            serviceNumber: payload.serviceNumber,
            contactNumber: payload.contactNumber,
            rank: payload.rank,
            unit: payload.unit,
            accessRights: payload.accessRights,
            errorMessage: null,
        }));
    },
    
    onLogout: (payload) => {
        // Limpiar timers al salir
        const id = get().autoRefreshTimerId;
        if (id) clearTimeout(id);
        set({ ...initialState, status: 'not-authenticated', errorMessage: payload, autoRefreshTimerId: null });
    },
    
    clearErrorMesage: () => set({ errorMessage: null }),
    
    setToken: (data) => {
        set({ token: data.token, tokenFechaExpiracion: data.fechaExpiracion });
        setTimeout(() => {
            get().scheduleAutoRefresh();
        }, 0);
    },

    // --- Lógica de Auto-Refresh (Opcional pero recomendada si venía en el nuevo código) ---
    startAutoRefresh: () => {
        get().scheduleAutoRefresh();
    },
    
    stopAutoRefresh: () => {
        const id = get().autoRefreshTimerId;
        if (id) {
            clearTimeout(id);
            set({ autoRefreshTimerId: null });
        }
    },
    
    scheduleAutoRefresh: () => {
        const prevId = get().autoRefreshTimerId;
        if (prevId) clearTimeout(prevId);

        const expiry = get().tokenFechaExpiracion;
        if (!expiry) return;

        const { VITE_TOKEN_REFRESH_BEFORE_EXPIRY } = getEnvVariables();
        // Valor por defecto 2 min (120000ms) si no está en .env
        const refreshBeforeExpiryMs = parseInt(VITE_TOKEN_REFRESH_BEFORE_EXPIRY || '120000', 10);

        const expiryTime = new Date(expiry).getTime();
        const now = Date.now();
        const timeUntilExpiry = expiryTime - now;
        const refreshTime = timeUntilExpiry - refreshBeforeExpiryMs;

        if (refreshTime > 0) {
            const id = setTimeout(async () => {
                try {
                    await get().doRefresh();
                } catch (err) {
                    console.error('scheduleAutoRefresh: doRefresh error', err);
                }
            }, refreshTime);
            set({ autoRefreshTimerId: id });
        } else if (timeUntilExpiry < 0) {
            get().onLogout('Token expirado');
        }
    },
    
    doRefresh: async () => {
        try {
            const { logon, password } = get();
            if (!logon || !password) throw new Error('No credentials for refresh');
            
            // Importación dinámica para evitar dependencia circular con authApi.js
            // Asegúrate que la ruta '../api/authApi' sea correcta según tu estructura
            const { authApi } = await import('../api/authApi');
            
            // Ajustamos la ruta para que coincida con tu BFF: /v1.0/users/authenticate
            const { data } = await authApi.post('/v1.0/users/authenticate', { logon, password });
            
            if (data.token && data.fechaExpiracion) {
                set({ token: data.token, tokenFechaExpiracion: new Date(data.fechaExpiracion) });
                get().scheduleAutoRefresh();
            } else {
                throw new Error('Invalid refresh response');
            }
        } catch (error) {
            console.error('doRefresh error:', error);
            get().onLogout('Error renovando token');
        }
    },

    // --- Helpers de permisos ---
    getAccessRight: (resourceName) => {
        const rights = get().accessRights || [];
        return rights.find((r) => r.resourceName === resourceName) || null;
    },
    getAccessRightAccess: (resourceName) => {
        const rights = get().accessRights || [];
        const resource = rights.find((r) => r.resourceName === resourceName) || null;
        return resource ? resource.access : null;
    },
    getAccessRightEditable: (resourceName) => {
        const rights = get().accessRights || [];
        const resource = rights.find((r) => r.resourceName === resourceName) || null;
        return resource ? resource.editable : null;
    },
    getAccessRightVisible: (resourceName) => {
        const rights = get().accessRights || [];
        const resource = rights.find((r) => r.resourceName === resourceName) || null;
        return resource ? resource.visible : null;
    },
}));