// src/layouts/DashboardLayout/useDashboardLayout.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

/**
 * Hook para lógica del DashboardLayout
 */
export const useDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    user,
    handleLogout,
  };
};

export default useDashboardLayout;