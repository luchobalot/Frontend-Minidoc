// src/components/common/UsuarioDetailModal/UsuarioDetailModal.jsx
import React from 'react';
import { useUsuarioDetailModal } from './useUsuarioDetailModal';
import UsuarioDetailModalView from './UsuarioDetailModalView';

const UsuarioDetailModal = ({
  open,
  onClose,
  usuario,
  loading = false,
  error = null,
  onRefresh,
}) => {
  const { isClosing, handleClose } = useUsuarioDetailModal(open, onClose);

  return (
    <UsuarioDetailModalView
      open={open}
      isClosing={isClosing}
      onClose={handleClose}
      usuario={usuario}
      loading={loading}
      error={error}
      onRefresh={onRefresh}
    />
  );
};

export default UsuarioDetailModal;