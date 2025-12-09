// src/components/common/DeleteModal/DeleteModal.jsx
import React from 'react';
import DeleteModalView from './DeleteModalView';
import { useDeleteModal } from './useDeleteModal';

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Eliminar',
  message = 'Estás seguro que deseas eliminar este elemento?',
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  loadingText = 'Eliminando...',
}) => {
  const { loading, showAlert, handleConfirm, closeAlert } = useDeleteModal(onConfirm);

  return (
    <DeleteModalView
      open={open}
      onClose={onClose}
      title={title}
      message={message}
      confirmText={confirmText}
      cancelText={cancelText}
      loadingText={loadingText}
      loading={loading}
      showAlert={showAlert}
      onConfirm={handleConfirm}
      onCloseAlert={closeAlert}
    />
  );
};

export default DeleteModal;