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

  [theme.breakpoints.down('md')]: {
    padding: '24px 16px',
  },
}));

// Grid de Cards del Dashboard
export const DashboardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
}));