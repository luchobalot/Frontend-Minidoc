// src/components/utils/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

function ProtectedRoute({ children, redirectTo = '/login' }) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthReady = useAuthStore((s) => s.isAuthReady ?? true);

  console.log('🧩 [ProtectedRoute] Estado actual:', {
    path: location.pathname,
    isAuthenticated,
    isAuthReady,
  });

  if (!isAuthReady) {
    console.log('🕓 [ProtectedRoute] Esperando a que la store esté lista...');
    return null;
  }

  if (!isAuthenticated) {
    console.warn(
      `🚫 [ProtectedRoute] Acceso denegado a "${location.pathname}", redirigiendo a ${redirectTo}`
    );
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  console.log(`✅ [ProtectedRoute] Acceso permitido a "${location.pathname}"`);
  return children;
}

export default ProtectedRoute;
