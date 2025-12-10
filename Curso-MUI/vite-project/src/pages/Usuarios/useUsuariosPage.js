// src/hooks/useUsuariosPage.js
import { useState, useCallback } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useModalState } from '../../hooks/useModalState';
import useAuthStore from '../../stores/useAuthStore';
import { usuariosService } from '../../services/usuariosService';

export const useUsuariosPage = () => {
  const [activeSection, setActiveSection] = useState('usuarios-home');

  const baseUrl = useAuthStore((state) => state.baseUrl || 'https://localhost:7006/api/v1.0');
  const token = useAuthStore((state) => state.token);
  const supervisorId = useAuthStore((state) => state.user?.id);

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

  const detailModal = useModalState();
  const deleteModal = useModalState();

  const handleViewUsuario = useCallback((usuario) => {
    detailModal.open(usuario);
  }, [detailModal]);

  const handleEditUsuario = useCallback((usuario) => {
    console.log('Editar usuario:', usuario);
    setActiveSection('modificar-usuario');
  }, []);

  const handleDeleteUsuario = useCallback((usuario) => {
    deleteModal.open(usuario);
  }, [deleteModal]);

  const handleConfirmDelete = useCallback(async () => {
    const usuario = deleteModal.data;
    if (!usuario) return;

    const result = await deleteUsuario(usuario.id);
    
    if (result.success) {
      deleteModal.close();
    }
    
    return result;
  }, [deleteModal, deleteUsuario]);

  const handleCreateUsuario = useCallback(async (formData) => {
    try {
      if (!token || !supervisorId) {
        return { success: false, error: 'Sesión inválida' };
      }

      // Paso 1: Crear usuario basico
      const createResponse = await usuariosService.createUsuario(baseUrl, token, supervisorId, formData);
      const userId = createResponse.id;

      if (!userId) {
        return { success: false, error: 'No se obtuvo ID del usuario creado' };
      }

      // Paso 2: Actualizar con datos completos
      const updateResponse = await usuariosService.updateUsuario(baseUrl, token, userId, formData);

      // Recargar lista
      await refresh();

      return { success: true, data: updateResponse };
    } catch (error) {
      console.error('Error creando usuario:', error);
      return { success: false, error: error.message || 'Error al crear usuario' };
    }
  }, [baseUrl, token, supervisorId, refresh]);

  const handleAddNew = useCallback(() => {
    setActiveSection('agregar-usuario');
  }, []);

  const handleRefreshModal = useCallback(() => {
    if (detailModal.data) {
      detailModal.open(detailModal.data);
    }
  }, [detailModal]);

  const getBreadcrumbs = useCallback(() => {
    const breadcrumbsMap = {
      'listado-general': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Listado General' },
      ],
      'agregar-usuario': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Agregar Usuario' },
      ],
      'movimientos': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Movimientos' },
      ],
      'busqueda-avanzada': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Busqueda Avanzada' },
      ],
      'modificar-usuario': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Modificar Usuario' },
      ],
      'otorgar-permisos': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Otorgar Permisos' },
      ],
      'control-accesos': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Control de Accesos' },
      ],
      'usuarios-organica': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Usuarios por Organica' },
      ],
      'estructura-jerarquica': [
        { label: 'Usuarios', href: '/usuarios' },
        { label: 'Estructura Jerarquica' },
      ],
    };

    return breadcrumbsMap[activeSection] || [];
  }, [activeSection]);

  return {
    activeSection,
    setActiveSection,
    usuarios,
    loading,
    error,
    pagination,
    filters,
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
    changePage,
    changeLimit,
    updateFilters,
    getBreadcrumbs,
  };
};

export default useUsuariosPage;