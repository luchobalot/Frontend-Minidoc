// src/pages/Usuarios/UsuariosPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { DashboardLayout } from '../../layouts/DashboardLayout/DashboardLayout';
import { sidebarUsuarios } from '../../components/layout/Sidebar/configs/sidebarUsuarios';
import { useUsuariosPage } from './useUsuariosPage';
import { 
  ListadoGeneralSection, 
  AgregarUsuarioSection,
  BusquedaAvanzada
} from './sections';
import UsuarioDetailModal from '../../components/common/UsuarioDetailModal/UsuarioDetailModal';
import DeleteModal from '../../components/common/DeleteModal/DeleteModal';
import ContentHeader from '../../components/common/ContentHeader/ContentHeader';


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

  const breadcrumbs = getBreadcrumbs();

  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios-home':
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Panel Principal"
              description="Dashboard principal del módulo de Usuarios"
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
        //return (
           //<AgregarUsuarioSection
             //onSubmit={handleCreateUsuario}
             //onClear={() => console.log('Limpiar')}
             //breadcrumbs={breadcrumbs}
            
            // />
        //);
          
      case 'movimientos':
      case 'busqueda-avanzada':
        //return (
          //<Box sx={{ width: '100%', maxWidth: '1400px' }}>
            //<ContentHeader
              //title="Busqueda Avanzada"
              //breadcrumbs={breadcrumbs}
            ///>
            //<BusquedaAvanzada />
          //</Box>
        //)
      case 'modificar-usuario':
      case 'otorgar-permisos':
      case 'control-accesos':
      case 'usuarios-organica':
      case 'estructura-jerarquica':
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Sección en desarrollo"
              breadcrumbs={breadcrumbs}
            />
            <Box sx={{ p: 3, color: 'text.secondary', textAlign: 'center' }}>
              <Typography variant="h6">Sección: {activeSection}</Typography>
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

      {/* Modal de eliminación */}
      <DeleteModal
        open={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message={`¿Estás seguro que deseas eliminar a ${deleteModal.data?.nombre} ${deleteModal.data?.apellido}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loadingText="Eliminando..."
      />
    </>
  );
}