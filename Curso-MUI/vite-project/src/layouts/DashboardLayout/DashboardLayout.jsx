// src/layouts/DashboardLayout/DashboardLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import PrimaryAppBar from '../../components/layout/AppBar/PrimaryAppBar';
import { Sidebar } from '../../components/layout/Sidebar';
import { useDashboardLayout } from './useDashboardLayout';

/**
 * Layout genérico para páginas con Sidebar y AppBar
 * 
 * @param {Object} props
 * @param {Array} props.sidebarSections - Secciones del sidebar
 * @param {string} props.activeSection - Sección activa
 * @param {Function} props.onSectionChange - Callback al cambiar sección
 * @param {ReactNode} props.children - Contenido principal
 * @param {string} props.sidebarTitle - Título del sidebar
 * @param {ReactNode} props.sidebarLogo - Logo del sidebar
 */
export const DashboardLayout = ({
  sidebarSections,
  activeSection,
  onSectionChange,
  children,
  sidebarTitle = 'MINIDOC',
  sidebarLogo = null,
}) => {
  const { sidebarOpen, toggleSidebar, closeSidebar, user, handleLogout } = useDashboardLayout();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F1F5F9', display: 'flex' }}>
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1200,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-280px)',
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
        />
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          transition: 'margin-left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          marginLeft: sidebarOpen ? '280px' : '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* AppBar */}
        <PrimaryAppBar
          sidebarOpen={sidebarOpen}
          onMenuClick={toggleSidebar}
          user={user}
          onLogout={handleLogout}
        />

        {/* Contenido */}
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
            boxSizing: 'border-box',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};