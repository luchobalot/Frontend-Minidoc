import { useAuthStore } from '../stores/useAuthStore';
import authApi from '../api/authApi';

export const useAuth = () => {

    const { status, user, errorMessage, onLogin, onLogout, onChecking } = useAuthStore();

    // =======================================================
    // LOGIN UNIFICADO (BFF)
    // =======================================================
    const startLogin = async ({ username, password }) => {
        
        onChecking();

        try {
            // Llamada al BFF
            const { data } = await authApi.post('/auth/login', { username, password });

            console.log("🚀 DATOS RECIBIDOS DEL BFF:", JSON.stringify(data, null, 2));
            
            // Si todo sale bien (200 OK)
            localStorage.setItem('token', data.token);
            onLogin(data.usuario, data.token);

        } catch (error) {
            
            console.error("Error en login:", error);
            let message = 'Error al intentar ingresar';
            
            if (error.response) {
                // El servidor respondió con un código de error
                const { status, data } = error.response;
                
                // Priorizamos el mensaje que envía el backend
                const backendMessage = data?.message;

                switch (status) {
                    case 400:
                        message = backendMessage || 'Datos incorrectos.';
                        break;
                    case 401:
                        // Contraseña incorrecta
                        message = backendMessage || 'Credenciales incorrectas.';
                        break;
                    case 403:
                        // USUARIO FANTASMA: Credenciales OK, pero sin Persona
                        message = backendMessage || 'Tu usuario es válido, pero no tenés legajo de personal asociado. Contactá a soporte.';
                        break;
                    case 503:
                        // BFF no puede conectar con Auth o Personal
                        message = 'Sistema temporalmente no disponible (Error de conexión interno).';
                        break;
                    case 500:
                        message = 'Error interno del servidor.';
                        break;
                    default:
                        message = backendMessage || `Error desconocido (${status})`;
                }
            } else if (error.request) {
                // No hubo respuesta del todo (BFF apagado o red caída)
                message = 'No se puede conectar con el servidor. Verifique su conexión.';
            }

            onLogout(message);
        }
    }

    // =======================================================
    // VERIFICAR ESTADO (Persistencia al recargar F5)
    // =======================================================
    const checkAuthToken = async () => {
        
        const token = localStorage.getItem('token');

        if ( !token ) return onLogout();

        // Ponemos status checking solo si hay token
        onChecking();

        try {
            const { data } = await authApi.get('/auth/renew');
            
            localStorage.setItem('token', data.token);
            onLogin(data.usuario, data.token);

        } catch (error) {
            localStorage.clear();
            onLogout(); // No mostramos error en renew, solo sacamos al usuario
        }
    }

    const startLogout = () => {
        localStorage.clear();
        onLogout();
    }

    return {
        // Propiedades
        status,
        user,
        errorMessage,

        // Métodos
        startLogin,
        checkAuthToken,
        startLogout
    }
}