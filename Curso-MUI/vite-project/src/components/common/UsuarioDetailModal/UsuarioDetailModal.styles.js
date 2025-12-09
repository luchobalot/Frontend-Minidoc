import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Card,
} from '@mui/material';

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
    backgroundImage:
      'linear-gradient(135deg, rgba(15, 23, 42, 0.02) 0%, rgba(30, 41, 59, 0.02) 100%)',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    // Que se adapte al tamaño real de la ventana:
    width: 'clamp(600px, 80vw, 1200px)',
    height: 'auto',
    maxHeight: 'calc(100vh - 48px)',
    margin: '24px auto',
    overflow: 'hidden',

    '@media (max-width: 1500px)': {
      width: '85vw',
      maxHeight: 'calc(100vh - 40px)',
    },
    '@media (max-width: 1200px)': {
      width: '90vw',
      maxHeight: 'calc(100vh - 36px)',
    },
    '@media (max-width: 900px)': {
      width: '94vw',
      maxHeight: 'calc(100vh - 32px)',
    },
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background:
    'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #1D4ED8 100%)',
  padding: '16px 24px',
  borderBottom: '1px solid rgba(226, 232, 240, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  flexShrink: 0,

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background:
      'linear-gradient(90deg, transparent, rgba(226,232,240,0.3), transparent)',
  },
}));

export const HeaderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
  minWidth: 0,
});

export const HeaderIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
  color: '#FFFFFF',
  flexShrink: 0,
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '28px 20px',
  background: '#FAFBFC',
  overflowY: 'auto',
  flexGrow: 1,
  minHeight: 0,

  '@media (max-width: 1500px)': {
    padding: '24px 18px',
  },
  '@media (min-width: 1920px)': {
    padding: '32px 24px',
  },
  '@media (min-width: 2560px)': {
    padding: '36px 28px',
  },

  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(100, 116, 139, 0.6) transparent',

  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background:
      'linear-gradient(180deg, rgba(59, 130, 246, 0.5) 0%, rgba(99, 102, 241, 0.4) 100%)',
    borderRadius: '4px',

    '&:hover': {
      background:
        'linear-gradient(180deg, rgba(59, 130, 246, 0.7) 0%, rgba(99, 102, 241, 0.6) 100%)',
    },
  },
}));

export const SectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  border: 'none',
  borderRadius: '12px',
  padding: '16px 18px',
  marginTop: '20px',
  transition: 'all 0.25s ease-out',
  backdropFilter: 'blur(8px)',
  position: 'relative',
  overflow: 'hidden',
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '14px',
  paddingBottom: '12px',
  borderBottom: '1.5px solid rgba(59, 130, 246, 0.2)',
}));

export const SectionContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  padding: '9px 0',
  borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
  transition: 'all 0.2s ease',

  '&:last-child': {
    borderBottom: 'none',
  },
}));

export const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  padding: '40px 20px',
  minHeight: '300px',
});

export const ErrorContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
  padding: '32px',
  borderRadius: '12px',
  backgroundColor: 'rgba(239, 68, 68, 0.06)',
  border: '1.5px solid rgba(239, 68, 68, 0.25)',
  minHeight: '200px',
  alignItems: 'flex-start',
  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)',
});

export const ErrorIconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'rgba(239, 68, 68, 0.15)',
  color: '#DC2626',
  fontSize: '24px',
  fontWeight: 'bold',
  flexShrink: 0,
  border: '1px solid rgba(239, 68, 68, 0.2)',
}));
