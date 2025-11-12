import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

// Contenido Principal
export const MainContent = styled(Box)({
  marginTop: '64px',
  padding: '24px 48px',
  maxWidth: '1400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  minHeight: 'calc(100vh - 64px)',

  '@media (max-width: 768px)': {
    padding: '16px',
  },
});

// Hero Section con diseño profesional
export const HeroSection = styled(Box)({
  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  borderRadius: '24px',
  padding: '32px 48px',
  marginBottom: '32px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  '@media (max-width: 768px)': {
    padding: '24px',
    borderRadius: '16px',
  },
});

// Contenedor del contenido del Hero
export const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 1,

  '@media (max-width: 968px)': {
    textAlign: 'center',
  },
});

// Contenedor de texto del Hero
export const HeroTextContainer = styled(Box)({
  flex: 1,
  color: 'white',
});

// Saludo pequeño
export const GreetingText = styled(Box)({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '6px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
});

// Nombre del usuario
export const UserNameText = styled(Box)({
  fontSize: '2rem',
  fontWeight: 700,
  color: 'white',
  marginBottom: '8px',
  letterSpacing: '-0.02em',
  lineHeight: 1.2,

  '@media (max-width: 768px)': {
    fontSize: '1.75rem',
  },
});

// Descripción del sistema
export const SystemDescription = styled(Box)({
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.85)',
  fontWeight: 400,
  maxWidth: '500px',
  lineHeight: 1.5,

  '@media (max-width: 968px)': {
    maxWidth: '100%',
  },

  '@media (max-width: 768px)': {
    fontSize: '0.925rem',
  },
});

// Sección de título para las cards
export const SectionHeader = styled(Box)({
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const SectionTitle = styled(Box)({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#111827',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  '&::before': {
    content: '""',
    width: '4px',
    height: '24px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    borderRadius: '2px',
  },
});

// Grid de Cards del Dashboard
export const DashboardGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',

  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
});