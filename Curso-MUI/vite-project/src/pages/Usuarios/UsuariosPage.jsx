// src/pages/Usuarios/UsuariosPage.jsx
import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout/DashboardLayout';
import { sidebarUsuarios } from '../../components/layout/Sidebar/configs/sidebarUsuarios';
import { useUsuariosPage } from './useUsuariosPage';
import { 
  ListadoGeneralSection, 
  AgregarUsuarioSection, 
  MovimientosSection 
} from './sections';
import UsuarioDetailModal from '../../components/common/UsuarioDetailModal/UsuarioDetailModal';
import DeleteModal from '../../components/common/DeleteModal/DeleteModal';
import { Box, Typography } from '@mui/material';
import ContentHeader from '../../components/common/ContentHeader/ContentHeader';

/**
 * Página principal de gestión de usuarios
 */
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
  } = useUsuariosPage();

  /**
   * Renderizar contenido según sección activa
   */
  const renderSection = () => {
    switch (activeSection) {
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
          />
        );

      case 'agregar-usuario':
        return (
          <AgregarUsuarioSection
            onSubmit={handleCreateUsuario}
            onClear={() => console.log('Limpiar formulario')}
          />
        );

      case 'movimientos':
        return (
          <MovimientosSection
            onRefresh={() => console.log('Actualizar movimientos')}
          />
        );

      case 'busqueda-avanzada':
      case 'modificar-usuario':
      case 'otorgar-permisos':
      case 'control-accesos':
      case 'usuarios-organica':
      case 'estructura-jerarquica':
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Seccion en Desarrollo"
              description="Esta funcionalidad estara disponible proximamente."
            />
            <Box sx={{ p: 3, color: '#E2E8F0', textAlign: 'center' }}>
              <Typography variant="h6">Seccion: {activeSection}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Contenido en construccion
              </Typography>
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Seccion no encontrada"
              description="Selecciona una opcion valida en el menu lateral."
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
        message={`¿Estas seguro que deseas eliminar a ${deleteModal.data?.nombre} ${deleteModal.data?.apellido}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loadingText="Eliminando..."
      />
    </>
  );
}