// src/hooks/useUsuarios.js
import { useState, useEffect, useCallback } from 'react';
import { usuariosService } from '../services/usuariosService';

/**
 * Hook para gestión de usuarios
 * @param {Object} config - Configuración inicial
 * @returns {Object} Estado y funciones para gestionar usuarios
 */
export const useUsuarios = (config = {}) => {
  const {
    autoFetch = true,
    initialPage = 1,
    initialLimit = 10,
    initialOrderBy = 'apellido',
    initialOrder = 'asc',
  } = config;

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    orderBy: initialOrderBy,
    order: initialOrder,
  });

  /**
   * Obtener usuarios con filtros actuales
   */
  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await usuariosService.getAll({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        orderBy: filters.orderBy,
        order: filters.order,
      });

      console.log('📦 Respuesta completa del servicio:', response);
        console.log('📦 Tipo de response:', typeof response);
        console.log('📦 Es array?:', Array.isArray(response));
        console.log('📦 response.data:', response.data);
        console.log('📦 Es array response.data?:', Array.isArray(response.data));

      setUsuarios(response.data || response);
      
      // Si la API devuelve metadata de paginación
      if (response.metadata) {
        setPagination(prev => ({
          ...prev,
          total: response.metadata.total,
          totalPages: response.metadata.totalPages,
        }));
      }
    } catch (err) {
      setError(err.firstErrorMessage || 'Error al cargar usuarios');
      console.error('Error en fetchUsuarios:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  /**
   * Crear usuario
   */
  const createUsuario = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const newUsuario = await usuariosService.create(userData);
      await fetchUsuarios(); // Recargar lista
      return { success: true, data: newUsuario };
    } catch (err) {
      const errorMsg = err.firstErrorMessage || 'Error al crear usuario';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar usuario
   */
  const updateUsuario = async (id, userData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedUsuario = await usuariosService.update(id, userData);
      await fetchUsuarios(); // Recargar lista
      return { success: true, data: updatedUsuario };
    } catch (err) {
      const errorMsg = err.firstErrorMessage || 'Error al actualizar usuario';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar usuario
   */
  const deleteUsuario = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await usuariosService.delete(id);
      await fetchUsuarios(); // Recargar lista
      return { success: true };
    } catch (err) {
      const errorMsg = err.firstErrorMessage || 'Error al eliminar usuario';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cambiar página
   */
  const changePage = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  /**
   * Cambiar límite de filas
   */
  const changeLimit = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  /**
   * Actualizar filtros
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset a página 1
  };

  /**
   * Refrescar lista
   */
  const refresh = () => {
    fetchUsuarios();
  };

  // Auto-fetch al montar o cuando cambien dependencias
  useEffect(() => {
    if (autoFetch) {
      fetchUsuarios();
    }
  }, [autoFetch, fetchUsuarios]);

  return {
    usuarios,
    loading,
    error,
    pagination,
    filters,
    fetchUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    changePage,
    changeLimit,
    updateFilters,
    refresh,
  };
};