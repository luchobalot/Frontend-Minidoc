import React from 'react';
import { Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledAppBar, MenuIconButton } from './AppBar.styles';
import { useAppBar } from './useAppBar';
import UserMenu from './UserMenu/UserMenu.jsx';

/**
 * AppBar completamente genÃ©rico y configurable
 *
 * Props:
 * @param {boolean} sidebarOpen - Estado del sidebar
 * @param {Function} onMenuClick - Callback para abrir/cerrar el sidebar
 * @param {object} [user] - Datos del usuario actual
 * @param {Function} [onLogout] - Callback de logout
 * @param {Function} [onNavigateLogout] - Callback post logout (opcional)
 * @param {boolean} [showUserMenu] - Mostrar icono de usuario (default: true)
 */
export default function PrimaryAppBar({
  onMenuClick,
  sidebarOpen,
  user = null,
  onLogout,
  onNavigateLogout,
  showUserMenu = true,
}) {
  const { user: userData } = useAppBar({
    user,
    onLogout,
    onNavigateLogout,
  });

  return (
    <StyledAppBar elevation={0}>
      <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* === BotÃ³n hamburguesa (abre el sidebar) === */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!sidebarOpen && (
            <MenuIconButton edge="start" color="inherit" onClick={onMenuClick}>
              <MenuIcon fontSize="medium" />
            </MenuIconButton>
          )}
        </Box>

        {/* === Iconos a la derecha === */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
          {/* ==== Menu de usuario (perfil) ==== */}
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