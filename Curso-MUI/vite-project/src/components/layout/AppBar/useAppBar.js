// useAppBar.js

import { useState } from 'react';

/**
 * Hook genérico para manejar lógica del AppBar
 * 
 * @param {object} config
 * @param {object} [config.user] - Usuario actual
 * @param {function} [config.onLogout] - Callback de cierre de sesión
 * @param {function} [config.onNavigateLogout] - Callback de navegación post logout
 * @param {boolean} [config.showNotifications] - Si debe mostrar notificaciones
 * @param {Array} [config.initialNotifications] - Lista inicial de notificaciones
 */
export const useAppBar = (config = {}) => {
  const {
    user = null,
    onLogout = () => {},
    onNavigateLogout = null,
    showNotifications = false,
    initialNotifications = [],
  } = config;

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [anchorNotifications, setAnchorNotifications] = useState(null);
  const [notifications, setNotifications] = useState(
    showNotifications ? initialNotifications : []
  );

  const isMenuOpen = Boolean(anchorMenu);
  const isNotificationsOpen = Boolean(anchorNotifications);

  // === Manejo de menú de usuario ===
  const handleOpenMenu = (e) => setAnchorMenu(e.currentTarget);
  const handleCloseMenu = () => setAnchorMenu(null);

  // === Manejo de menú de notificaciones ===
  const handleOpenNotifications = (e) => setAnchorNotifications(e.currentTarget);
  const handleCloseNotifications = () => setAnchorNotifications(null);

  // === Marcar una notificación como leída ===
  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // === Marcar todas como leídas ===
  const handleMarkAllAsRead = () => setNotifications([]);

  // === Cerrar sesión ===
  const handleLogout = () => {
    handleCloseMenu();
    onLogout();
    if (onNavigateLogout) onNavigateLogout();
  };

  return {
    user,
    notifications,
    isMenuOpen,
    isNotificationsOpen,
    anchorMenu,
    anchorNotifications,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenNotifications,
    handleCloseNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleLogout,
  };
};
