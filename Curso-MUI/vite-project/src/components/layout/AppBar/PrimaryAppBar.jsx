import React from 'react';
import { Box, Toolbar, Tooltip, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { StyledAppBar, StyledIconButton, MenuIconButton } from './AppBar.styles';
import { useAppBar } from './useAppBar';
import NotificationsMenu from './NotificationsMenu/NotificationsMenu.jsx';
import UserMenu from './UserMenu/UserMenu.jsx';

/**
 * AppBar completamente genérico y configurable
 *
 * Props:
 * @param {boolean} sidebarOpen - Estado del sidebar
 * @param {Function} onMenuClick - Callback para abrir/cerrar el sidebar
 * @param {object} [user] - Datos del usuario actual
 * @param {Function} [onLogout] - Callback de logout
 * @param {Function} [onNavigateLogout] - Callback post logout (opcional)
 * @param {Array} [notifications] - Lista de notificaciones
 * @param {boolean} [showNotifications] - Mostrar icono de notificaciones (default: true)
 * @param {boolean} [showUserMenu] - Mostrar icono de usuario (default: true)
 */
export default function PrimaryAppBar({
  onMenuClick,
  sidebarOpen,
  user = null,
  onLogout,
  onNavigateLogout,
  notifications = [],
  showNotifications = false,
  showUserMenu = false,
}) {
  const {
    anchorNotifications,
    notifications: unreadNotifications,
    isNotificationsOpen,
    handleOpenNotifications,
    handleCloseNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
  } = useAppBar({
    user,
    onLogout,
    onNavigateLogout,
    showNotifications,
    initialNotifications: notifications,
  });

  return (
    <StyledAppBar elevation={0}>
      <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* === Botón hamburguesa (abre el sidebar) === */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!sidebarOpen && (
            <MenuIconButton edge="start" color="inherit" onClick={onMenuClick}>
              <MenuIcon fontSize="medium" />
            </MenuIconButton>
          )}
        </Box>

        {/* === Iconos a la derecha === */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
          {/* ==== Notificaciones ==== */}
          {showNotifications && (
            <>
              <Tooltip title="Notificaciones">
                <StyledIconButton onClick={handleOpenNotifications}>
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
                </StyledIconButton>
              </Tooltip>

              <NotificationsMenu
                anchorEl={anchorNotifications}
                open={isNotificationsOpen}
                onClose={handleCloseNotifications}
                notifications={unreadNotifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            </>
          )}

          {/* ==== Menú de usuario (perfil) ==== */}
          {showUserMenu && (
            <UserMenu
              user={user}
              onLogout={onLogout}
              onNavigateLogout={onNavigateLogout}
            />
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
