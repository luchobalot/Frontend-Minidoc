import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/useAuthStore';
import { mockNotifications } from './data/mockNotifications';

export const useAppBar = () => {
  const navegarHacia = useNavigate();
  const { logout, user } = useAuthStore();
  
  const [anclaMenu, setAnclaMenu] = useState(null);
  const [anclaNotificaciones, setAnclaNotificaciones] = useState(null);
  const [notificacionesSinLeer, setNotificacionesSinLeer] = useState(mockNotifications);

  const menuAbierto = Boolean(anclaMenu);
  const notificacionesAbiertas = Boolean(anclaNotificaciones);

  // Manejo de menu de perfil
  const manejarAperturaMenu = (evento) => setAnclaMenu(evento.currentTarget);
  const manejarCierreMenu = () => setAnclaMenu(null);

  // Manejo de menu de notificaciones
  const manejarAperturaNotificaciones = (evento) => setAnclaNotificaciones(evento.currentTarget);
  const manejarCierreNotificaciones = () => setAnclaNotificaciones(null);

  // Marcar una notificacion como leida (eliminarla de la lista)
  const manejarMarcarComoLeida = (idNotificacion) => {
    setNotificacionesSinLeer(previas => previas.filter(n => n.id !== idNotificacion));
    console.log('Notificacion marcada como leida:', idNotificacion);
  };

  // Marcar todas como leidas
  const manejarMarcarTodasComoLeidas = () => {
    console.log('Todas las notificaciones marcadas como leidas');
    setNotificacionesSinLeer([]);
  };

  // Cerrar sesion
  const manejarCerrarSesion = () => {
    manejarCierreMenu();
    logout();
    navegarHacia('/login', { replace: true });
  };

  // Obtener iniciales del usuario
  const obtenerInicialesUsuario = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return 'U';
  };

  // Obtener nombre de usuario
  const obtenerNombreUsuario = () => {
    return user?.logon ? `@${user.logon}` : '@usuario';
  };

  return {
    // Estado
    usuario: user,
    anclaMenu,
    anclaNotificaciones,
    notificacionesSinLeer,
    menuAbierto,
    notificacionesAbiertas,
    
    // Funciones
    manejarAperturaMenu,
    manejarCierreMenu,
    manejarAperturaNotificaciones,
    manejarCierreNotificaciones,
    manejarMarcarComoLeida,
    manejarMarcarTodasComoLeidas,
    manejarCerrarSesion,
    obtenerInicialesUsuario,
    obtenerNombreUsuario,
  };
};