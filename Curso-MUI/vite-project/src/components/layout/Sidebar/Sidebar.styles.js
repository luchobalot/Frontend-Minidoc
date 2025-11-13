// src/components/layout/Sidebar/Sidebar.styles.js
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Contenedor principal del Sidebar
export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})(({ collapsed }) => ({
  width: collapsed ? 80 : 280,
  height: '100vh',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  borderRight: '1px solid #E5E7EB',
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
}));

// Header del Sidebar
export const SidebarHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})(({ collapsed }) => ({
  padding: collapsed ? '16px 12px' : '10px 24px',
  borderBottom: '1px solid rgba(226, 232, 240, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  minHeight: collapsed ? 'auto' : '64px',
  background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #1D4ED8 100%)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(226,232,240,0.3), transparent)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
  },
}));

// Contenido con scroll
export const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '16px 0',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(0, 0, 0, 0.2)',
  },
});

// BotÃ³n de item del sidebar con estados activo/hover
export const StyledListItemButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'collapsed',
})(({ isActive, collapsed }) => ({
  margin: collapsed ? '4px 8px' : '4px 16px',
  padding: collapsed ? '12px 8px' : '12px 16px',
  borderRadius: '12px',
  backgroundColor: isActive ? '#3B82F6' : 'transparent',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: collapsed ? 'center' : 'flex-start',
  gap: collapsed ? 0 : 16,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: isActive ? '70%' : '0%',
    backgroundColor: '#FFFFFF',
    borderRadius: '0 4px 4px 0',
    transition: 'height 0.25s ease',
    boxShadow: isActive ? '0 0 12px rgba(255,255,255,0.5)' : 'none',
  },
  '&:hover': {
    backgroundColor: isActive ? '#2563EB' : 'rgba(59, 130, 246, 0.08)',
    transform: 'translateX(4px)',
    boxShadow: isActive 
      ? '0 4px 16px rgba(59, 130, 246, 0.3)' 
      : '0 2px 8px rgba(0, 0, 0, 0.05)',
    '& .item-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  '&:active': {
    transform: 'translateX(2px) scale(0.98)',
  },
}));

// Icono del item
export const ItemIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ isActive }) => ({
  color: isActive ? '#FFFFFF' : '#6B7280',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.25s ease',
  fontSize: '20px',
  '& svg': {
    fontSize: 'inherit',
  },
}));

// Header de secciÃ³n
export const SectionHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed' && prop !== 'expanded',
})(({ collapsed, expanded }) => ({
  display: collapsed ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 24px',
  margin: '8px 0 4px 0',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s ease',
  borderRadius: '8px',
  marginLeft: 16,
  marginRight: 16,
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.04)',
    '& .section-title': {
      color: '#3B82F6',
    },
    '& .MuiIconButton-root': {
      color: '#3B82F6',
    },
  },
  '& .section-title': {
    fontSize: '0.6875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#9CA3AF',
    transition: 'color 0.2s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .MuiIconButton-root': {
    color: '#9CA3AF',
    padding: 4,
    transition: 'transform 0.2s ease, color 0.2s ease',
    transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
    minWidth: '24px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));