// useUserMenu.js
import { useState } from 'react';

/**
 * Hook genérico para menú de usuario (perfil)
 * 
 * @param {object} config
 * @param {object} [config.user] - Datos del usuario
 * @param {function} [config.onLogout] - Función para cerrar sesión
 * @param {function} [config.onNavigateLogout] - Función opcional post-logout
 */
export const useUserMenu = (config = {}) => {
  const { user = null, onLogout = () => {}, onNavigateLogout = null } = config;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    onLogout();
    if (onNavigateLogout) onNavigateLogout();
  };

  return {
    user,
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleLogout,
  };
};
