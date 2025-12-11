// src/layouts/DashboardLayout/DashboardLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; // 1. IMPORTANTE: Importar Outlet
import PrimaryAppBar from '../../components/layout/AppBar/PrimaryAppBar';
import { Sidebar } from '../../components/layout/Sidebar';
import { useDashboardLayout } from './useDashboardLayout';

// Importa tu configuración de menú por defecto (ajusta el nombre del archivo si es necesario)
import { sidebarUsuarios } from '../../components/layout/Sidebar/configs/sidebarUsuarios';

export const DashboardLayout = ({
  // 2. Asignar valor por defecto para evitar que Sidebar falle
  sidebarSections = sidebarUsuarios, 
  activeSection,
  onSectionChange,
  children,
  sidebarTitle = 'MINIDOC',
  sidebarLogo = null,
}) => {
  const { sidebarOpen, toggleSidebar, closeSidebar, user, handleLogout } = useDashboardLayout();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const handleCollapsedChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const getMarginLeft = () => {
    if (!sidebarOpen) return '0';
    return sidebarCollapsed ? '80px' : '280px';
  };

  const getSidebarWidth = () => {
    return sidebarCollapsed ? '80px' : '280px';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F1F5F9', display: 'flex' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1200,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: sidebarOpen ? 'translateX(0)' : `translateX(-${getSidebarWidth()})`,
        }}
      >
        <Sidebar
          open={sidebarOpen}
          onClose={closeSidebar}
          onToggle={toggleSidebar}
          sections={sidebarSections}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          titulo={sidebarTitle}
          logo={sidebarLogo}
          onCollapsedChange={handleCollapsedChange}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          marginLeft: getMarginLeft(),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <PrimaryAppBar
          sidebarOpen={sidebarOpen}
          onMenuClick={toggleSidebar}
          user={user}
          onLogout={handleLogout}
        />

        <Box
          sx={{
            flexGrow: 1,
            mt: 6,
            py: 2,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
             {/* 3. Renderizar Outlet si no hay children (para rutas anidadas) */}
             {children ? children : <Outlet />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};