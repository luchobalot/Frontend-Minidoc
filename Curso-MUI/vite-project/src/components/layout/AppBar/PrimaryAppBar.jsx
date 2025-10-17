import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/useAuthStore';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Grow,
  Badge,
  alpha,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsMenu from '../../common/NotificationsMenu/NotificationsMenu';

const UserProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.2),
  padding: theme.spacing(1),
  borderRadius: 10,
  cursor: 'default',
}));

export default function PrimaryAppBar({
  activeSection,
  onSectionChange,
  onMenuClick,
  sidebarOpen,
}) {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  
  // Estado para manejar notificaciones no leidas
  const [unreadNotifications, setUnreadNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Usuario creado exitosamente',
      message: 'El usuario "Juan Perez" ha sido registrado en el sistema.',
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: 2,
      type: 'warning',
      title: 'Actualizacion pendiente',
      message: 'Hay 3 usuarios con datos incompletos que requieren atencion.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      type: 'info',
      title: 'Mantenimiento programado',
      message: 'El sistema estara en mantenimiento el sabado de 02:00 a 06:00.',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 4,
      type: 'error',
      title: 'Error en sincronizacion',
      message: 'No se pudo sincronizar con el servidor principal.',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
    },
  ]);
  
  const openMenu = Boolean(anchorEl);
  const openNotifications = Boolean(notificationsAnchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  
  const handleNotificationsOpen = (e) => setNotificationsAnchorEl(e.currentTarget);
  const handleNotificationsClose = () => setNotificationsAnchorEl(null);

  // Marcar una notificacion como leida (eliminarla de la lista)
  const handleMarkAsRead = (notificationId) => {
    setUnreadNotifications(prev => prev.filter(n => n.id !== notificationId));
    console.log('Notificacion marcada como leida:', notificationId);
  };

  // Marcar todas como leidas
  const handleMarkAllAsRead = () => {
    console.log('Todas las notificaciones marcadas como leidas');
    setUnreadNotifications([]);
  };

  // Cerrar sesion
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login', { replace: true });
  };

  // Obtener iniciales del usuario
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return 'U';
  };

  // Obtener username
  const getUsername = () => {
    return user?.logon ? `@${user.logon}` : '@usuario';
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: (theme) => alpha(theme.palette.background.paper, 0.96),
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: (theme) => alpha(theme.palette.divider, 0.8),
        zIndex: 1100,
        width: '100%',
        left: 0,
      }}
    >
      <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* Menu hamburguesa - solo visible cuando sidebar cerrado */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!sidebarOpen && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onMenuClick}
              sx={{ 
                color: 'text.primary', 
                '&:hover': { 
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1) 
                },
              }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          )}
        </Box>

        {/* Iconos a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
          <Tooltip title="Notificaciones">
            <IconButton
              onClick={handleNotificationsOpen}
              sx={{
                color: 'text.primary',
                '&:hover': { 
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1) 
                },
              }}
            >
              <Badge 
                badgeContent={unreadNotifications.length} 
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: 'error.main',
                    color: 'primary.contrastText',
                    fontSize: '0.7rem',
                    height: 18,
                    minWidth: 18,
                  },
                }}
              >
                <NotificationsIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Mi cuenta">
            <IconButton 
              onClick={handleMenuOpen} 
              sx={{ color: 'text.primary' }}
            >
              <AccountCircleIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          {/* Menu de notificaciones */}
          <NotificationsMenu
            anchorEl={notificationsAnchorEl}
            open={openNotifications}
            onClose={handleNotificationsClose}
            notifications={unreadNotifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />

          {/* Menu desplegable de perfil */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            TransitionComponent={Grow}
            transitionDuration={250}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                p: 0.8,
                borderRadius: 2,
                minWidth: 210,
                background: (theme) => alpha(theme.palette.background.paper, 0.96),
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.common.white, 0.1),
                color: 'text.primary',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              },
            }}
          >
            {/* Perfil dentro del menu */}
            <UserProfile>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                   fontSize: '1rem',
                  background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                  border: '1px solid',
                  borderColor: (theme) => alpha(theme.palette.common.white, 0.2),
                }}
              >
                {getUserInitials()}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  fontSize="0.9rem"
                  letterSpacing="0.02em"
                  sx={{ color: 'text.primary' }}
                >
                  {user?.rank && (
                    <Box component="span" sx={{ color: 'secondary.light' }}>
                      {user.rank}{' '}
                    </Box>
                  )}
                  {user?.lastName || 'USUARIO'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: (theme) => alpha(theme.palette.text.primary, 0.6), 
                    fontSize: '0.75rem' 
                  }}
                >
                  {getUsername()}
                </Typography>
              </Box>
            </UserProfile>

            <Divider 
              sx={{ 
                my: 0.8, 
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08) 
              }} 
            />

            <MenuItem
              onClick={() => console.log('Editar perfil')}
              sx={{
                py: 0.7,
                borderRadius: 10,
                fontSize: '0.85rem',
                '& svg': { fontSize: 18, color: 'text.primary' },
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1),
                  transform: 'translateX(3px)',
                },
              }}
            >
              <EditIcon sx={{ mr: 1 }} />
              Editar perfil
            </MenuItem>

            <MenuItem
              onClick={() => console.log('Preferencias')}
              sx={{
                py: 0.7,
                borderRadius: 10,
                fontSize: '0.85rem',
                '& svg': { fontSize: 18, color: 'text.primary' },
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1),
                  transform: 'translateX(3px)',
                },
              }}
            >
              <SettingsIcon sx={{ mr: 1 }} />
              Preferencias
            </MenuItem>

            <Divider 
              sx={{ 
                my: 0.8, 
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08) 
              }} 
            />

            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 0.7,
                borderRadius: 10,
                fontSize: '0.85rem',
                '& svg': { fontSize: 18, color: 'text.primary' },
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.error.main, 0.2),
                  transform: 'translateX(3px)',
                },
              }}
            >
              <LogoutIcon sx={{ mr: 1 }} />
              Cerrar sesion
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}