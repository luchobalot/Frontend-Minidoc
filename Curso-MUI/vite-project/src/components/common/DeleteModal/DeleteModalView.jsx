// src/components/common/DeleteModal/DeleteModalView.jsx
import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Slide,
  Box,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  ErrorOutline as ErrorOutlineIcon,
} from '@mui/icons-material';
import {
  StyledDialog,
  StyledDialogTitle,
  TitleContent,
  TitleIcon,
  StyledDialogContent,
  StyledDialogActions,
} from './DeleteModal.styles';

const SlideDown = (props) => <Slide {...props} direction="down" />;

const DeleteModalView = ({
  open,
  onClose,
  title = 'Eliminar',
  message = 'Estás seguro que deseas eliminar este elemento?',
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  loadingText = 'Eliminando...',
  loading = false,
  showAlert = false,
  onConfirm,
  onCloseAlert,
}) => {
  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <StyledDialogTitle>
          <TitleContent>
            <TitleIcon>
              <DeleteIcon sx={{ fontSize: '24px' }} />
            </TitleIcon>
            <DialogTitle sx={{ p: 0, color: '#FFFFFF', fontWeight: 700 }}>
              {title}
            </DialogTitle>
          </TitleContent>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'rgba(248, 250, 252, 0.8)',
              width: '44px',
              height: '44px',
              '&:hover': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          >
            <CloseIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </StyledDialogTitle>

        <StyledDialogContent>
          <DialogContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography
              sx={{
                color: '#0F172A',
                fontSize: '1.1rem',
                fontWeight: 700,
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              {message}
            </Typography>
            <Typography
              sx={{
                color: '#DC2626',
                fontSize: '0.9rem',
                fontWeight: 600,
                lineHeight: 1.5,
                textAlign: 'center',
                padding: '12px 16px',
                backgroundColor: 'rgba(220, 38, 38, 0.08)',
                borderRadius: '8px',
                border: '1px solid rgba(220, 38, 38, 0.2)',
              }}
            >
              Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema y no podrá ser recuperado.
            </Typography>
          </DialogContent>
        </StyledDialogContent>

        <StyledDialogActions>
          <DialogActions sx={{ p: 0, gap: 1 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                color: '#64748B',
                borderColor: '#E2E8F0',
                fontWeight: 600,
                borderRadius: '8px',
                padding: '8px 24px',
                textTransform: 'none',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#475569',
                },
              }}
            >
              {cancelText}
            </Button>

            <Button
              onClick={onConfirm}
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress size={18} sx={{ color: '#FFFFFF' }} />
                ) : (
                  <DeleteIcon sx={{ fontSize: '18px' }} />
                )
              }
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                borderRadius: '8px',
                padding: '8px 24px',
                textTransform: 'none',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)',
                '&:hover:not(.Mui-disabled)': {
                  background: 'linear-gradient(135deg, #B91C1C 0%, #991B1B 100%)',
                  boxShadow: '0 4px 8px rgba(220, 38, 38, 0.3)',
                  transform: 'translateY(-1px)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(220, 38, 38, 0.5)',
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              {loading ? loadingText : confirmText}
            </Button>
          </DialogActions>
        </StyledDialogActions>
      </StyledDialog>

      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={onCloseAlert}
        TransitionComponent={SlideDown}
      >
        <Alert
          severity="success"
          icon={false}
          sx={{
            bgcolor: '#10B981',
            color: '#FFFFFF',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ErrorOutlineIcon fontSize="inherit" />
            <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem' }}>
              Usuario eliminado correctamente!
            </Typography>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteModalView;