import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Contenido Principal
export const MainContent = styled(Box)(({ theme }) => ({
  marginTop: '64px',
  padding: '40px 48px',
  maxWidth: '1400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  minHeight: 'calc(100vh - 64px)',
  background: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Centra verticalmente el contenido
  gap: '40px', // Espacio entre el grid y el footer

  [theme.breakpoints.down('md')]: {
    padding: '24px 16px',
    gap: '32px',
  },
}));

// Grid de Cards del Dashboard con animaciones
export const DashboardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',

  // Animación de entrada escalonada para las cards
  '& > *': {
    animation: 'fadeInUp 0.6s ease-out backwards',
  },

  '& > *:nth-of-type(1)': {
    animationDelay: '0.1s',
  },

  '& > *:nth-of-type(2)': {
    animationDelay: '0.2s',
  },

  '& > *:nth-of-type(3)': {
    animationDelay: '0.3s',
  },

  '& > *:nth-of-type(4)': {
    animationDelay: '0.4s',
  },

  '& > *:nth-of-type(5)': {
    animationDelay: '0.5s',
  },

  '& > *:nth-of-type(6)': {
    animationDelay: '0.6s',
  },

  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
}));