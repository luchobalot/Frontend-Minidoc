// src/components/common/DeleteModal/DeleteModal.styles.js
import { styled } from '@mui/material/styles';
import { Dialog, Slide } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    transition: 'all 0.4s ease-in-out',
  },
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#FFFFFF',
    backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.02) 0%, rgba(30, 41, 59, 0.02) 100%)',
    border: 'none',
    maxWidth: '480px',
    width: '100%',
    margin: '16px',
    overflow: 'hidden',
  },
}));

export const StyledDialogTitle = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)',
  padding: '20px 24px',
  borderBottom: '1px solid rgba(226, 232, 240, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(226,232,240,0.3), transparent)',
  },
}));

export const TitleContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
});

export const TitleIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
  color: '#FFFFFF',
  flexShrink: 0,
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

export const StyledDialogContent = styled('div')(({ theme }) => ({
  padding: '24px',
  background: '#FAFBFC',
  minHeight: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledDialogActions = styled('div')({
  padding: '20px 24px',
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
  borderTop: '1px solid rgba(226, 232, 240, 0.5)',
});