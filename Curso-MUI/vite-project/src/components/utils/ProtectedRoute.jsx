// src/components/utils/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthReady, isTokenExpired, logout } = useAuthStore();

  useEffect(() => {
    // Verificar expiracion del token cuando se monta el componente
    if (isAuthReady && isAuthenticated && isTokenExpired()) {
      console.warn('[ProtectedRoute] Token expirado detectado');
      logout();
    }
  }, [isAuthReady, isAuthenticated, isTokenExpired, logout]);

  // Mostrar loading mientras se hidrata el store desde localStorage
  if (!isAuthReady) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#E5E7EB"
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Si no esta autenticado o el token expiro, redirigir al login
  if (!isAuthenticated || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  // Si todo esta bien, renderizar el componente protegido
  return children;
};

export default ProtectedRoute;