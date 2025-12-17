import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

// Contenido Principal
export const MainContent = styled(Box)({
  marginTop: '64px',
  padding: '40px 48px',
  maxWidth: '1400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  minHeight: 'calc(100vh - 64px)',
  background: '#ffffff',

  '@media (max-width: 768px)': {
    padding: '24px 16px',
  },
});

// Grid de Cards del Dashboard
export const DashboardGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '28px',
  animation: 'fadeInUp 0.6s ease-out',

  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
});

// Card mejorada
export const DashboardCardStyled = styled(Card)({
  padding: '32px 28px',
  borderRadius: '16px',
  border: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',

  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  '&:active': {
    transform: 'translateY(-4px)',
  },

  '&.disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
  },
});

// Icono de la card
export const CardIconContainer = styled(Box)({
  width: '56px',
  height: '56px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  fontSize: '28px',
  position: 'relative',
  transition: 'all 0.3s ease',

  '& svg': {
    width: '28px',
    height: '28px',
    position: 'relative',
    zIndex: 1,
  },
});

// Título de la card
export const CardTitle = styled(Box)({
  fontSize: '1.125rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: '8px',
  lineHeight: 1.2,
});

// Descripción de la card
export const CardDescription = styled(Box)({
  fontSize: '0.875rem',
  color: '#6b7280',
  lineHeight: 1.5,
  marginBottom: '20px',
  flex: 1,
});

// Footer de la card con stats
export const CardFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: '16px',
  borderTop: '1px solid #e5e7eb',
  fontSize: '0.8125rem',
  color: '#9ca3af',
});