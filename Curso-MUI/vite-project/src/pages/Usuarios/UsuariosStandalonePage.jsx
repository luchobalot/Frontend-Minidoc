// src/pages/Usuarios/UsuariosStandalonePage.jsx
import React, { useState, useCallback } from 'react';
import { Box, Container } from '@mui/material';
import UsuariosTable from '../../components/tables/UsuariosTable/UsuariosTable';
import UsuarioDetailModal from '../../components/common/UsuarioDetailModal/UsuarioDetailModal';
import DeleteModal from '../../components/common/DeleteModal/DeleteModal';
import { useUsuariosTable } from '../../components/tables/UsuariosTable/useUsuariosTable';

export default function UsuariosStandalonePage() {
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingUsuario, setDeletingUsuario] = useState(null);

  const {
    usuarios,
    allUsuarios,
    loading,
    error,
    searchQuery,
    page,
    rowsPerPage,
    orderBy,
    order,
    totalPages,
    dense,
    setSearchQuery,
    handleSearch,
    handleClearSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleToggleDense,
    loadUsuarios,
  } = useUsuariosTable();

  const handleViewUsuario = useCallback((usuario) => {
    setSelectedUsuario(usuario);
    setDetailModalOpen(true);
  }, []);

  const handleEditUsuario = useCallback((usuario) => {
    console.log('Editar usuario:', usuario);
  }, []);

  const handleDeleteUsuario = useCallback((usuario) => {
    setDeletingUsuario(usuario);
    setDeleteModalOpen(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setDetailModalOpen(false);
    setTimeout(() => {
      setSelectedUsuario(null);
    }, 300);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setTimeout(() => {
      setDeletingUsuario(null);
    }, 300);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingUsuario) return;
    console.log('Eliminar usuario:', deletingUsuario.id);
    handleCloseDeleteModal();
    await loadUsuarios();
  }, [deletingUsuario, handleCloseDeleteModal, loadUsuarios]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        py: 3,
      }}
    >
      <Container maxWidth="xl">
        <UsuariosTable
          onView={handleViewUsuario}
          onEdit={handleEditUsuario}
          onDelete={handleDeleteUsuario}
        />
      </Container>

      <UsuarioDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        usuario={selectedUsuario}
        loading={false}
        error={null}
        onRefresh={() => {
          if (selectedUsuario) {
            console.log('Refrescando datos del usuario:', selectedUsuario.id);
            loadUsuarios();
          }
        }}
      />

      <DeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message={
          deletingUsuario
            ? `Estas seguro que deseas eliminar a ${deletingUsuario.nombre} ${deletingUsuario.apellido}?`
            : 'Eliminar usuario?'
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        loadingText="Eliminando..."
      />
    </Box>
  );
}