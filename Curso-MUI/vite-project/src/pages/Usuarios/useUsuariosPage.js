// src/hooks/useUsuariosPage.js
import { useState, useCallback } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useModalState } from '../../hooks/useModalState';

export const useUsuariosPage = () => {
  const [activeSection, setActiveSection] = useState('usuarios-home');


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
    const result = await createUsuario(formData);
    
    if (result.success) {
      setActiveSection('listado-general');
    }
    
    return result;
  }, [createUsuario]);

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
      'usuarios-home': [
      { label: 'Panel Principal', href: '/usuarios' }
    ],
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