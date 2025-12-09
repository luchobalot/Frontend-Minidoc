// src/components/common/DeleteModal/useDeleteModal.js
import { useState, useCallback } from 'react';

export const useDeleteModal = (onConfirm) => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    try {
      await onConfirm();
      setShowAlert(true);
      
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      
      return true;
    } catch (err) {
      console.error('Error en eliminación:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [onConfirm]);

  const closeAlert = useCallback(() => {
    setShowAlert(false);
  }, []);

  return {
    loading,
    showAlert,
    handleConfirm,
    closeAlert,
  };
};