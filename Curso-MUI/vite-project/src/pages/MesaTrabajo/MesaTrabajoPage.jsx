// src/pages/MesaTrabajo/MesaTrabajoPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { DashboardLayout } from '../../layouts/DashboardLayout/DashboardLayout';
import { sidebarMesaTrabajo } from '../../components/layout/Sidebar/configs/sidebarMesaTrabajo';
import { useMesaTrabajoPage } from './useMesaTrabajoPage';
import ContentHeader from '../../components/common/ContentHeader/ContentHeader';

export default function MesaTrabajoPage() {
  const {
    activeSection,
    setActiveSection,
    getBreadcrumbs,
  } = useMesaTrabajoPage();

  const breadcrumbs = getBreadcrumbs();

  const renderSection = () => {
    switch (activeSection) {
      case 'mesa-trabajo-home':
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Panel Principal"
              description="Bienvenido a Mesa de Trabajo"
              breadcrumbs={breadcrumbs}
            />
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Panel Principal de Mesa de Trabajo</Typography>
            </Box>
          </Box>
        );

      case 'conocimiento':
      case 'recibidos':
      case 'girados':
      case 'transmitidos':
      case 'busqueda-avanzada':
      case 'cargar-recibidos':
      case 'cargar-transmitidos':
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Sección en Desarrollo"
              description="Esta funcionalidad estará disponible próximamente."
              breadcrumbs={breadcrumbs}
            />
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Sección: {activeSection}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Contenido aún no disponible
              </Typography>
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Sección no encontrada"
              description="Selecciona una opción válida en el menú lateral."
              breadcrumbs={[]}
            />
          </Box>
        );
    }
  };

  return (
    <DashboardLayout
      sidebarSections={sidebarMesaTrabajo}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      sidebarTitle="MINIDOC"
    >
      {renderSection()}
    </DashboardLayout>
  );
}