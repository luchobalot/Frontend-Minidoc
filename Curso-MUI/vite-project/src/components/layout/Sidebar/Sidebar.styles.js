import { styled } from '@mui/material/styles';
import { Box, ListItemButton } from '@mui/material';

// Contenedor principal del Sidebar
export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100vh',
  background: theme.palette.background.paper,
  backdropFilter: 'blur(10px)',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  borderRight: `1px solid ${theme.palette.divider}`,
  paddingTop: 0,
}));

// Header del Sidebar
export const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
  minHeight: '64px',
  maxHeight: '64px',
  boxSizing: 'border-box',
  position: 'relative',
}));

// Contenido con scroll
export const ScrollableContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  zIndex: 1,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.2)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.3)' 
      : 'rgba(0, 0, 0, 0.3)',
  },
}));

// Botón de item del sidebar con estados activo/hover
export const StyledListItemButton = styled(ListItemButton)(({ theme, isActive }) => ({
  margin: '4px 16px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isActive 
    ? `${theme.palette.primary.main}33`
    : 'transparent',
  borderLeft: isActive 
    ? `3px solid ${theme.palette.primary.light}` 
    : '3px solid transparent',
  transition: 'all 0.2s ease',
  color: isActive 
    ? theme.palette.text.primary 
    : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: isActive 
      ? `${theme.palette.primary.main}40`
      : theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.04)',
    transform: 'translateX(4px)',
  },
}));