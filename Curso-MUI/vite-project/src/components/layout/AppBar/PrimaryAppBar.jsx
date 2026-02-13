import React from 'react';
import { Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledAppBar, MenuIconButton } from './AppBar.styles';
import UserMenu from './UserMenu/UserMenu.jsx';
import NotificationMenu from './NotificationMenu';

export default function PrimaryAppBar({
  onMenuClick,
  sidebarOpen,
  onLogout,
  onNavigateLogout,
  showUserMenu = true,
  showNotifications = true,
  hideMenuButton = false,
}) {
  return (
    <StyledAppBar elevation={0}>
      <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* === Botón hamburguesa === */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!sidebarOpen && !hideMenuButton && (
            <MenuIconButton edge="start" color="inherit" onClick={onMenuClick}>
              <MenuIcon fontSize="medium" />
            </MenuIconButton>
          )}
        </Box>

        {/* === Menú de usuario y Notificaciones === */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
          {showNotifications && (
            <NotificationMenu />
          )}

          {showUserMenu && (
            <UserMenu
              onLogout={onLogout}
              onNavigateLogout={onNavigateLogout}
            />
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
