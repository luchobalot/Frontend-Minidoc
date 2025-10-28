import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, MenuItem, IconButton } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  background: alpha(theme.palette.background.paper, 0.96),
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.8),
  zIndex: 1100,
  width: '100%',
  left: 0,
  boxShadow: 'none',
}));

export const UserProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.2),
  padding: theme.spacing(1),
  borderRadius: 10,
  cursor: 'default',
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(0.7, 1.5),
  borderRadius: 10,
  fontSize: '0.85rem',
  transition: 'all 0.2s ease',
  '& svg': { 
    fontSize: 18, 
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transform: 'translateX(3px)',
  },
}));

export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(0.7, 1.5),
  borderRadius: 10,
  fontSize: '0.85rem',
  transition: 'all 0.2s ease',
  '& svg': { 
    fontSize: 18, 
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.2),
    transform: 'translateX(3px)',
  },
}));

export const MenuIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));