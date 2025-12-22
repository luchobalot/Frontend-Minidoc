import { styled, alpha } from '@mui/material/styles';
import { Menu, MenuItem, Box, Avatar } from '@mui/material';

// Menu principal con diseño profesional y sutil
export const StyledMenuLayout = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(2.5),
    padding: 0,
    borderRadius: theme.spacing(2),
    minWidth: 280,
    maxWidth: 320,
    background: '#FFFFFF',
    border: '1px solid',
    borderColor: alpha(theme.palette.divider, 0.5),
    boxShadow: `
      0 4px 6px -1px rgba(0, 0, 0, 0.08),
      0 2px 4px -2px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.02)
    `,
    overflow: 'visible',
    
    // Flecha superior
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -8,
      right: 20,
      width: 16,
      height: 16,
      backgroundColor: '#FFFFFF',
      border: '1px solid',
      borderColor: alpha(theme.palette.divider, 0.5),
      borderBottom: 'none',
      borderRight: 'none',
      transform: 'rotate(45deg)',
      zIndex: 0,
    },
  },
  '& .MuiList-root': {
    padding: 0,
  },
}));

// Sección del header con información del usuario
export const UserProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  gap: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Avatar mejorado
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: '1rem',
  fontWeight: 600,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  border: '2px solid',
  borderColor: '#FFFFFF',
  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
}));

// Contenedor de la información del usuario
export const UserInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

// Sección de items del menú
export const MenuSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

// Item de menú base con mejor diseño
export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  margin: '2px 0',
  borderRadius: theme.spacing(1.5),
  gap: theme.spacing(1.5),
  fontSize: '0.9rem',
  padding: theme.spacing(1, 1.5),
  fontWeight: 500,
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
    paddingLeft: theme.spacing(2),
    
    '& svg': {
      color: theme.palette.primary.main,
      transform: 'translateX(2px)',
    },
  },
  
  '& svg': {
    fontSize: '1.3rem',
    color: theme.palette.text.secondary,
    transition: 'all 0.2s ease',
  },
}));

// Item de Cerrar Sesión con diseño diferenciado
export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  margin: '2px 0',
  borderRadius: theme.spacing(1.5),
  gap: theme.spacing(1.5),
  fontSize: '0.9rem',
  padding: theme.spacing(1, 1.5),
  fontWeight: 500,
  color: theme.palette.error.main,
  transition: 'all 0.2s ease',
  
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.08),
    paddingLeft: theme.spacing(2),
    
    '& svg': {
      transform: 'translateX(2px)',
    },
  },
  
  '& svg': {
    fontSize: '1.3rem',
    color: theme.palette.error.main,
    transition: 'all 0.2s ease',
  },
}));

// Divider personalizado más elegante
export const StyledDivider = styled(Box)(({ theme }) => ({
  height: 1,
  margin: theme.spacing(1, 2),
  background: `linear-gradient(90deg, 
    transparent 0%, 
    ${theme.palette.divider} 50%, 
    transparent 100%
  )`,
}));