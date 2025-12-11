// src/hooks/useAuth.js
import { useAuthStore } from '../stores/useAuthStore';
import { authApi } from '../api/authApi';

export const useAuth = () => {
    const status = useAuthStore((state) => state.status);
    const errorMessage = useAuthStore((state) => state.errorMessage);
    const checking = useAuthStore((state) => state.checking);
    const onLogin = useAuthStore((state) => state.onLogin);
    const onLogout = useAuthStore((state) => state.onLogout);
    const setToken = useAuthStore((state) => state.setToken);

    const startLogin = async ({ email, password }) => {
        checking();
        try {
            // 1. Petición al BFF: POST /api/v1.0/users/authenticate
            // El DTO de C# espera: { Logon, Password }
            const { data } = await authApi.post('/v1.0/users/authenticate', { 
                logon: email, 
                password 
            });

            // Asumiendo que el BFF devuelve directamente la respuesta de la API real
            const { token, fechaExpiracion, userId } = data;
            
            if (!token) {
                 throw new Error('No se recibió token del servidor');
            }

            // Guardar token temporalmente
            setToken({ token, fechaExpiracion: new Date(fechaExpiracion) });

            // 2. Petición al BFF: GET /api/v1.0/users/{userId}
            // El BFF se encarga de pasar el Bearer token a la API real
            const userDataResponse = await authApi.get(`/v1.0/users/${userId}`);
            const userData = userDataResponse.data;

            // TODO: Ajustar según si la API devuelve permisos en un endpoint separado o junto con el usuario.
            // Según tu código anterior, parecía requerir otra llamada. Si el BFF lo maneja, ajusta aquí.
            // Por ahora, asumimos que obtienes los permisos de alguna forma o los omites si no son críticos ya.
            // const userAccessRights = await authApi.get(`/v1.0/permissions/${userId}`); 
            
            // Construir payload para el store
            onLogin({
                token,
                tokenFechaExpiracion: new Date(fechaExpiracion),
                userId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                logon: email,
                email,
                // Mapea el resto de campos que devuelva tu API real
                organization: userData.organization,
                // accessRights: userAccessRights.data.ownPermissionsDTO, // Descomentar si implementas permisos
                errorMessage: null,
            });

        } catch (error) {
            console.error(error);
            // Manejo de errores basado en la respuesta del BFF
            let msg = 'Error al iniciar sesión';
            if (error.response?.status === 401) msg = 'Credenciales incorrectas';
            else if (error.response?.status === 500) msg = 'Error del servidor (BFF/API)';
            
            onLogout(msg);
        }
    };

    const startLogout = () => {
        onLogout();
    };

    return {
        status,
        errorMessage,
        startLogin,
        startLogout,
    };
};