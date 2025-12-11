import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// Importación de Páginas
import Login from '../pages/Login/Login';
import Inicio from '../pages/Inicio/InicioPage';
import UsuariosPage from '../pages/Usuarios/UsuariosPage';
import UsuariosStandalonePage from '../pages/Usuarios/UsuariosStandalonePage';
import MesaTrabajoPage from '../pages/MesaTrabajo/MesaTrabajoPage';

export const AppRouter = () => {
    const { status } = useAuth();

    if (status === 'checking') {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h3>Cargando sesión...</h3>
            </div>
        );
    }

    return (
        <Routes>
            {status === 'not-authenticated' ? (
                /* --- RUTAS PÚBLICAS --- */
                <>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            ) : (
                /* --- RUTAS PRIVADAS --- */
                <>
                    {/* NOTA: Ya NO envolvemos estas rutas en DashboardLayout desde aquí.
                       Cada página (Inicio, Usuarios, Mesa) invoca su propio layout internamente.
                    */}
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/usuarios" element={<UsuariosPage />} />
                    <Route path="/mesa-trabajo" element={<MesaTrabajoPage />} />
                    
                    {/* Rutas auxiliares */}
                    <Route path="/tabla-usuarios" element={<UsuariosStandalonePage />} />

                    {/* Redirección por defecto */}
                    <Route path="/" element={<Navigate to="/inicio" />} />
                    <Route path="/*" element={<Navigate to="/inicio" />} />
                </>
            )}
        </Routes>
    );
};