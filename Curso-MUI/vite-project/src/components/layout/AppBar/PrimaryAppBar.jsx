import React from 'react';
import { Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledAppBar, MenuIconButton } from './AppBar.styles';
import { useAppBar } from './useAppBar';
import UserMenu from './UserMenu/UserMenu.jsx';

export default function PrimaryAppBar({
  onMenuClick,
  sidebarOpen,
  user = null,
  onLogout,
  onNavigateLogout,
  showUserMenu = true,
  hideMenuButton = false,
}) {
  const { user: userData } = useAppBar({
    user,
    onLogout,
    onNavigateLogout,
  });

  return (
    <StyledAppBar elevation={0}>
      <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* === Botón hamburguesa (abre el sidebar) === */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* 2. Modifica la condición para ocultarlo si hideMenuButton es true */}
          {!sidebarOpen && !hideMenuButton && (
            <MenuIconButton edge="start" color="inherit" onClick={onMenuClick}>
              <MenuIcon fontSize="medium" />
            </MenuIconButton>
          )}
        </Box>

        {/* === Iconos a la derecha === */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
          {showUserMenu && (
            <UserMenu
              user={userData}
              onLogout={onLogout}
              onNavigateLogout={onNavigateLogout}
            />
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}