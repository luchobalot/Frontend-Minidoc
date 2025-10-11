// src/components/common/DeleteModal/DeleteModal.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  alpha,
  styled,
  Snackbar,
  Alert,
  Slide,
  Box,
} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon, ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';

// Animación para Snackbar desde arriba
const SlideDown = (props) => <Slide {...props} direction="down" />;

// Estilos del modal
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: '#0F172A',
    borderRadius: '16px',
    border: `1px solid ${alpha('#EF4444', 0.2)}`,
    maxWidth: '450px',
    width: '100%',
    margin: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
}));

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Eliminar',
  message = '¿Estás seguro que deseas eliminar este elemento?',
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  loadingText = 'Eliminando...',
}) => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <DialogTitle sx={{ color: '#EF4444', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {title}
          <CloseIcon
            sx={{ cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}
            onClick={onClose}
          />
        </DialogTitle>

        <DialogContent sx={{ color: '#FFFFFF' }}>
          <Typography>{message}</Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: '#FFFFFF',
              borderColor: alpha('#FFFFFF', 0.3),
            }}
          >
            {cancelText}
          </Button>

          <Button
            onClick={handleConfirm}
            variant="contained"
            color="error"
            startIcon={
              loading ? <CircularProgress size={20} sx={{ color: '#FFFFFF' }} /> : <DeleteIcon />
            }
            disabled={loading}
          >
            {loading ? loadingText : confirmText}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar con icono visible */}
      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        TransitionComponent={SlideDown}
      >
        <Alert
          severity="error"
          icon={false}
          sx={{
            bgcolor: '#EF4444',
            color: '#FFFFFF',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ErrorOutlineIcon fontSize="inherit" />
            <Typography>Se ha eliminado correctamente!</Typography>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteModal;
