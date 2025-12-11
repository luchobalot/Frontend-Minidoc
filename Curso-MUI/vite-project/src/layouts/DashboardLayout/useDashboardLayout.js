// src/layouts/DashboardLayout/useDashboardLayout.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

export const useDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  // SOLUCIÓN AL BUCLE INFINITO:
  // Seleccionamos las propiedades individualmente (son valores primitivos estables)
  const firstName = useAuthStore((state) => state.firstName);
  const lastName = useAuthStore((state) => state.lastName);
  const logon = useAuthStore((state) => state.logon);
  const onLogout = useAuthStore((state) => state.onLogout);

  // Reconstruimos el objeto user solo con los datos obtenidos
  const userProps = { firstName, lastName, logon };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login', { replace: true });
  };

  return {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    user: userProps,
    handleLogout,
  };
};