// src/components/layout/AppBar/UserMenu/useUserMenu.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- IMPORTANTE
import { useAuthStore } from '../../../../stores/useAuthStore';

export const useUserMenu = ({ user, onLogout, onNavigateLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // <--- Hook de navegación

  // Si usas el store global, podrías sacarlo de aquí también
  const usuario = user; 

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    if (onLogout) onLogout();
    // Si tienes una lógica de logout global, úsala aquí.
    // Si no, navigate('/auth/login') podría servir como respaldo
    if (onNavigateLogout) onNavigateLogout();
  };

  // --- NUEVAS FUNCIONES DE NAVEGACIÓN ---
  const handleEditarPerfil = () => {
    handleClose(); // Cerramos el menú primero
    navigate('/mi-perfil/editar'); // Redirige a la ruta que quieras
  };

  const handlePreferencias = () => {
    handleClose();
    navigate('/mi-perfil/preferencias');
  };
  // --------------------------------------

  // Lógica de presentación
  const getIniciales = () => {
    if (usuario?.firstName && usuario?.lastName) {
      return `${usuario.firstName.charAt(0)}${usuario.lastName.charAt(0)}`.toUpperCase();
    }
    return "U";
  };

  const getNombreCompleto = () => usuario?.lastName || "USUARIO";
  const getNombreUsuario = () => usuario?.logon ? `@${usuario.logon}` : "@usuario";
  const getRango = () => usuario?.rank || null;

  return {
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleLogout,
    handleEditarPerfil, // <--- Exportamos las funciones
    handlePreferencias, // <--- Exportamos las funciones
    userInfo: {
      iniciales: getIniciales(),
      nombreCompleto: getNombreCompleto(),
      nombreUsuario: getNombreUsuario(),
      rango: getRango(),
    }
  };
};