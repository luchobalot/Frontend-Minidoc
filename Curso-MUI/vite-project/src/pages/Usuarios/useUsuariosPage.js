// src/pages/Usuarios/useUsuariosPage.js
import { useState, useCallback } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useModalState } from '../../hooks/useModalState';
import { usuariosService } from '../../services/usuariosService';

/**
 * Hook para lógica de la página de usuarios
 */
export const useUsuariosPage = () => {
  const [activeSection, setActiveSection] = useState('listado-general');

  // Hook de gestión de usuarios
  const {
    usuarios,
    loading,
    error,
    pagination,
    filters,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    changePage,
    changeLimit,
    updateFilters,
    refresh,
  } = useUsuarios({
    autoFetch: true,
    initialLimit: 10,
  });

  // Modales
  const detailModal = useModalState();
  const deleteModal = useModalState();

  /**
   * Ver detalles de usuario
   */
  const handleViewUsuario = useCallback(async (usuario) => {
    detailModal.open(usuario);
    detailModal.setModalLoading(true);

    try {
      // Obtener datos completos del usuario
      const fullData = await usuariosService.getById(usuario.id);
      detailModal.updateData(fullData);
    } catch (err) {
      detailModal.setModalError(err.firstErrorMessage || 'Error al cargar detalles');
    } finally {
      detailModal.setModalLoading(false);
    }
  }, [detailModal]);

  /**
   * Editar usuario
   */
  const handleEditUsuario = useCallback((usuario) => {
    console.log('Editar usuario:', usuario);
    // TODO: Implementar lógica de edición
    setActiveSection('modificar-usuario');
  }, []);

  /**
   * Eliminar usuario
   */
  const handleDeleteUsuario = useCallback((usuario) => {
    deleteModal.open(usuario);
  }, [deleteModal]);

  /**
   * Confirmar eliminación
   */
  const handleConfirmDelete = useCallback(async () => {
    const usuario = deleteModal.data;
    if (!usuario) return;

    const result = await deleteUsuario(usuario.id);
    
    if (result.success) {
      deleteModal.close();
    }
    
    return result;
  }, [deleteModal, deleteUsuario]);

  /**
   * Crear nuevo usuario
   */
  const handleCreateUsuario = useCallback(async (formData) => {
    const result = await createUsuario(formData);
    
    if (result.success) {
      setActiveSection('listado-general');
    }
    
    return result;
  }, [createUsuario]);

  /**
   * Navegar a agregar usuario
   */
  const handleAddNew = useCallback(() => {
    setActiveSection('agregar-usuario');
  }, []);

  /**
   * Refrescar datos del modal
   */
  const handleRefreshModal = useCallback(async () => {
    if (!detailModal.data) return;
    
    detailModal.setModalLoading(true);
    detailModal.setModalError(null);

    try {
      const fullData = await usuariosService.getById(detailModal.data.id);
      detailModal.updateData(fullData);
    } catch (err) {
      detailModal.setModalError(err.firstErrorMessage || 'Error al actualizar');
    } finally {
      detailModal.setModalLoading(false);
    }
  }, [detailModal]);

  return {
    // Estado
    activeSection,
    setActiveSection,
    usuarios,
    loading,
    error,
    pagination,
    filters,
    
    // Modales
    detailModal,
    deleteModal,
    
    // Acciones
    handleViewUsuario,
    handleEditUsuario,
    handleDeleteUsuario,
    handleConfirmDelete,
    handleCreateUsuario,
    handleAddNew,
    handleRefreshModal,
    refresh,
    changePage,
    changeLimit,
    updateFilters,
  };
};