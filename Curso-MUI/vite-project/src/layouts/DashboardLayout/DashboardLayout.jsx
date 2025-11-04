// src/layouts/DashboardLayout/DashboardLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import PrimaryAppBar from '../../components/layout/AppBar/PrimaryAppBar';
import { Sidebar } from '../../components/layout/Sidebar';
import { useDashboardLayout } from './useDashboardLayout';

/**
 * Layout generico para paginas con Sidebar y AppBar
 * 
 * @param {Object} props
 * @param {Array} props.sidebarSections - Secciones del sidebar
 * @param {string} props.activeSection - Seccion activa
 * @param {Function} props.onSectionChange - Callback al cambiar seccion
 * @param {ReactNode} props.children - Contenido principal
 * @param {string} props.sidebarTitle - Titulo del sidebar
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
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const handleCollapsedChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Calcular el margin left basado en el estado del sidebar
  const getMarginLeft = () => {
    if (!sidebarOpen) return '0';
    return sidebarCollapsed ? '80px' : '280px';
  };

  // Calcular el ancho del sidebar para el transform
  const getSidebarWidth = () => {
    return sidebarCollapsed ? '80px' : '280px';
  };

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

      {/* Contenido principal */}
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
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};