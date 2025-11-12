import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Contenido Principal
export const MainContent = styled(Box)({
  marginTop: '64px',
  padding: '32px 48px',
  maxWidth: '1400px',
  marginLeft: 'auto',
  marginRight: 'auto',

  '@media (max-width: 768px)': {
    padding: '24px 16px',
  },
});

// Header de la Pagina
export const PageHeader = styled(Box)({
  marginBottom: '48px',
  textAlign: 'center',
});

// Titulo de Bienvenida
export const WelcomeTitle = styled(Box)({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: '12px',
  letterSpacing: '-0.02em',

  '@media (max-width: 768px)': {
    fontSize: '2rem',
  },
});

// Subtitulo de Bienvenida
export const WelcomeSubtitle = styled(Box)({
  fontSize: '1.125rem',
  color: '#6B7280',
  fontWeight: 400,
  maxWidth: '600px',
  margin: '0 auto',

  '@media (max-width: 768px)': {
    fontSize: '1rem',
    maxWidth: '100%',
  },
});

// Grid de Cards del Dashboard
export const DashboardGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '24px',
  marginTop: '48px',

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '16px',
    marginTop: '32px',
  },
});