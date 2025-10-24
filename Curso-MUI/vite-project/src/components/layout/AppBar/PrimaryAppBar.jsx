import React from 'react';
import {
  Box,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  Divider,
  Grow,
  Badge,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
// import NotificationsMenu from '../../common/NotificationsMenu/NotificationsMenu';
import { 
  StyledAppBar, 
  UserProfile, 
  StyledMenuItem, 
  LogoutMenuItem,
  StyledIconButton,
  MenuIconButton,
} from './AppBar.styles';
import { useAppBar } from './useAppBar';

export default function PrimaryAppBar({
  activeSection,
  onSectionChange,
  onMenuClick,
  sidebarOpen,
}) {
  const {
    usuario,
    anclaMenu,
    anclaNotificaciones,
    notificacionesSinLeer,
    menuAbierto,
    notificacionesAbiertas,
    manejarAperturaMenu,
    manejarCierreMenu,
    manejarAperturaNotificaciones,
    manejarCierreNotificaciones,
    manejarMarcarComoLeida,
    manejarMarcarTodasComoLeidas,
    manejarCerrarSesion,
    obtenerInicialesUsuario,
    obtenerNombreUsuario,
  } = useAppBar();

  return (
    <StyledAppBar elevation={0}>
      <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* Menu hamburguesa - solo visible cuando sidebar cerrado */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!sidebarOpen && (
            <MenuIconButton
              edge="start"
              color="inherit"
              onClick={onMenuClick}
            >
              <MenuIcon fontSize="medium" />
            </MenuIconButton>
          )}
        </Box>

        {/* Iconos a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
          <Tooltip title="Notificaciones">
            <StyledIconButton>
              <Badge 
                badgeContent={notificacionesSinLeer.length} 
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
            </StyledIconButton>
          </Tooltip>

          <Tooltip title="Mi cuenta">
            <StyledIconButton onClick={manejarAperturaMenu}>
              <AccountCircleIcon fontSize="medium" />
            </StyledIconButton>
          </Tooltip>

          {/* Menu de notificaciones comentado temporalmente */}
          {/*

          {/* Menu de notificaciones - DESHABILITADO */}
          {/*
          <NotificationsMenu
            anchorEl={anclaNotificaciones}
            open={notificacionesAbiertas}
            onClose={manejarCierreNotificaciones}
            notifications={notificacionesSinLeer}
            onMarkAsRead={manejarMarcarComoLeida}
            onMarkAllAsRead={manejarMarcarTodasComoLeidas}
          />
          */}

          {/* Menu desplegable de perfil */}
          <Menu
            anchorEl={anclaMenu}
            open={menuAbierto}
            onClose={manejarCierreMenu}
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
                {obtenerInicialesUsuario()}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  fontSize="0.9rem"
                  letterSpacing="0.02em"
                  sx={{ color: 'text.primary' }}
                >
                  {usuario?.rank && (
                    <Box component="span" sx={{ color: 'secondary.light' }}>
                      {usuario.rank}{' '}
                    </Box>
                  )}
                  {usuario?.lastName || 'USUARIO'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: (theme) => alpha(theme.palette.text.primary, 0.6), 
                    fontSize: '0.75rem' 
                  }}
                >
                  {obtenerNombreUsuario()}
                </Typography>
              </Box>
            </UserProfile>

            <Divider 
              sx={{ 
                my: 0.8, 
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08) 
              }} 
            />

            <StyledMenuItem onClick={() => console.log('Editar perfil')}>
              <EditIcon />
              Editar perfil
            </StyledMenuItem>

            <StyledMenuItem onClick={() => console.log('Preferencias')}>
              <SettingsIcon />
              Preferencias
            </StyledMenuItem>

            <Divider 
              sx={{ 
                my: 0.8, 
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08) 
              }} 
            />

            <LogoutMenuItem onClick={manejarCerrarSesion}>
              <LogoutIcon />
              Cerrar sesion
            </LogoutMenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}