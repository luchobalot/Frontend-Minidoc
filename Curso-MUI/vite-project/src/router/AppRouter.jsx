// src/routes/AppRouter.jsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { Box, CircularProgress } from '@mui/material';
// import { useAuth } from '../hooks/useAuth';

// --- Importación de Páginas ---
import Login from '../pages/Login/Login';
import Inicio from '../pages/Inicio/InicioPage';
import UsuariosPage from '../pages/Usuarios/UsuariosPage';
import UsuariosStandalonePage from '../pages/Usuarios/UsuariosStandalonePage';
import MesaTrabajoPage from '../pages/MesaTrabajo/MesaTrabajoPage';

import EditarPerfilPage from '../pages/MiPerfil/MiPerfil/MiPerfilPage';
import PreferenciasPage from '../pages/MiPerfil/Preferencias/PreferenciasPage';

export const AppRouter = () => {
    // 🔴 Auth deshabilitado para test
    // const { status } = useAuth();

    // if (status === 'checking') {
    //     return (
    //         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    return (
        <Routes>
            {/* ========================= */}
            {/* RUTAS PÚBLICAS (ACTIVAS) */}
            {/* ========================= */}

            <Route path="/auth/login" element={<Login />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/mesa-trabajo" element={<MesaTrabajoPage />} />
            <Route path="/tabla-usuarios" element={<UsuariosStandalonePage />} />

            
            <Route path="/mi-perfil/editar" element={<EditarPerfilPage />} />
            <Route path="/mi-perfil/preferencias" element={<PreferenciasPage />} />

            {/* Redirección base */}
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />

            {/* ================================= */}
            {/* RUTAS PRIVADAS (DESHABILITADAS) */}
            {/* ================================= */}

            {/*
            {status === 'not-authenticated' ? (
                <>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/organigrama" element={<OrganigramaPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            ) : (
                <>
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/usuarios" element={<UsuariosPage />} />
                    <Route path="/mesa-trabajo" element={<MesaTrabajoPage />} />
                    <Route path="/tabla-usuarios" element={<UsuariosStandalonePage />} />
                    <Route path="/" element={<Navigate to="/inicio" />} />
                    <Route path="/*" element={<Navigate to="/inicio" />} />
                </>
            )}
            */}
        </Routes>
    );
};
