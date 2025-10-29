// src/hooks/useModalState.js
import { useState, useCallback } from 'react';

/**
 * Hook genérico para gestionar estado de modales
 * @returns {Object} Estado y funciones del modal
 */
export const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const open = useCallback((modalData = null) => {
    setData(modalData);
    setIsOpen(true);
    setError(null);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Delay reset para animación de cierre
    setTimeout(() => {
      setData(null);
      setError(null);
      setLoading(false);
    }, 300);
  }, []);

  const setModalLoading = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const setModalError = useCallback((err) => {
    setError(err);
  }, []);

  const updateData = useCallback((newData) => {
    setData(newData);
  }, []);

  return {
    isOpen,
    data,
    loading,
    error,
    open,
    close,
    setModalLoading,
    setModalError,
    updateData,
  };
};