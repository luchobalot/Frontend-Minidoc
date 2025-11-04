// src/components/common/UsuarioDetailModal/useUsuarioDetailModal.js
import { useState, useEffect } from 'react';

export const useUsuarioDetailModal = (open, onClose) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setIsClosing(false);
    }
  }, [open]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return {
    isClosing,
    handleClose,
  };
};

export default useUsuarioDetailModal;