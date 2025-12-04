// src/pages/Usuarios/UsuariosPage.jsx
import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout/DashboardLayout';
import { sidebarUsuarios } from '../../components/layout/Sidebar/configs/sidebarUsuarios';
import { useUsuariosPage } from './useUsuariosPage';
import { 
  ListadoGeneralSection, 
  AgregarUsuarioSection,
} from './sections';
import UsuarioDetailModal from '../../components/common/UsuarioDetailModal/UsuarioDetailModal';
import DeleteModal from '../../components/common/DeleteModal/DeleteModal';
import { Box, Typography } from '@mui/material';
import ContentHeader from '../../components/common/ContentHeader/ContentHeader';

// Pagina principal de gestion de usuarios

export default function UsuariosPage() {
  const {
    activeSection,
    setActiveSection,
    usuarios,
    loading,
    detailModal,
    deleteModal,
    handleViewUsuario,
    handleEditUsuario,
    handleDeleteUsuario,
    handleConfirmDelete,
    handleCreateUsuario,
    handleAddNew,
    handleRefreshModal,
    refresh,
    getBreadcrumbs,
  } = useUsuariosPage();

  // Obtener breadcrumbs para la seccion activa
  const breadcrumbs = getBreadcrumbs();

  // Renderizar contenido segun seccion activa
   
  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios-home':
      return (
        <Box sx={{ width: '100%', maxWidth: '1400px' }}>
          <ContentHeader
            title="Panel Principal"
            description="Panel principal del módulo de Usuarios"
            breadcrumbs={breadcrumbs}
          />
        </Box>
      );
      
      case 'listado-general':
      return (
      <ListadoGeneralSection
           usuarios={usuarios}
           loading={loading}
           onView={handleViewUsuario}
           onEdit={handleEditUsuario}
           onDelete={handleDeleteUsuario}
           onAddNew={handleAddNew}
           onRefresh={refresh}
           breadcrumbs={breadcrumbs}
         />
       );
      
      case 'agregar-usuario':
        return (
         <AgregarUsuarioSection
           onSubmit={handleCreateUsuario}
            onClear={() => console.log('Limpiar')}
            breadcrumbs={breadcrumbs}
          />
        );
          
      case 'movimientos':
      case 'busqueda-avanzada':
      case 'modificar-usuario':
      case 'otorgar-permisos':
      case 'control-accesos':
      case 'usuarios-organica':
      case 'estructura-jerarquica':
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Seccion aun no disponible"
              breadcrumbs={breadcrumbs}
            />
            <Box sx={{ p: 3, color: '#E2E8F0', textAlign: 'center' }}>
              <Typography variant="h6">Seccion: {activeSection}</Typography>
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Seccion no encontrada"
              description="Selecciona una opcion valida en el menu lateral."
              breadcrumbs={[]}
            />
          </Box>
        );
    }
  };

  return (
    <>
      <DashboardLayout
        sidebarSections={sidebarUsuarios}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sidebarTitle="MINIDOC"
      >
        {renderSection()}
      </DashboardLayout>

      {/* Modal de detalles */}
      <UsuarioDetailModal
        open={detailModal.isOpen}
        onClose={detailModal.close}
        usuario={detailModal.data}
        loading={detailModal.loading}
        error={detailModal.error}
        onRefresh={handleRefreshModal}
      />

      {/* Modal de eliminacion */}
      <DeleteModal
        open={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message={`Estas seguro que deseas eliminar a ${deleteModal.data?.nombre} ${deleteModal.data?.apellido}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loadingText="Eliminando..."
      />
    </>
  );
}