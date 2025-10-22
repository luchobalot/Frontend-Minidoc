import { styled } from '@mui/material/styles';
import { Box, ListItemButton } from '@mui/material';

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100vh',
  background: 'rgba(8, 17, 40, 0.96)',
  backdropFilter: 'blur(10px)',
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  borderRight: '1px solid rgba(255,255,255,0.08)',
  paddingTop: 0,
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
  minHeight: '64px',
  maxHeight: '64px',
  boxSizing: 'border-box',
  position: 'relative',
}));

export const ScrollableContent = styled(Box)({
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
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
  },
});

export const StyledListItemButton = styled(ListItemButton)(({ isActive }) => ({
  margin: '4px 16px',
  borderRadius: 10,
  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
  borderLeft: isActive ? '3px solid #3B82F6' : '3px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(4px)',
  },
}));