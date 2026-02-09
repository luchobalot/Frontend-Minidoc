import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../stores/useAuthStore';

export const useUserMenu = ({ onLogout, onNavigateLogout } = {}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // === Usuario real desde el store ===
  const storeUser = useAuthStore((s) => s.user);
  const storeLogout = useAuthStore((s) => s.onLogout);

  /**
   * El store puede guardar:
   * - response.usuario
   * - o directamente el objeto usuario
   * Normalizamos acá.
   */
  const usuario = useMemo(() => {
    if (!storeUser) return null;
    if (storeUser.usuario) return storeUser.usuario;
    return storeUser;
  }, [storeUser]);

  const datos = usuario?.datosPersonales ?? null;

  // === Handlers ===
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();

    if (onLogout) onLogout();
    else if (storeLogout) storeLogout();

    try {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    } catch {}

    if (onNavigateLogout) onNavigateLogout();
  };

  const handleEditarPerfil = () => {
    handleClose();
    navigate('/mi-perfil/editar');
  };

  const handlePreferencias = () => {
    handleClose();
    navigate('/mi-perfil/preferencias');
  };

  // === Helpers de UI ===
  const getIniciales = () => {
    const nombre = (datos?.nombre ?? '').trim();
    const apellido = (datos?.apellido ?? '').trim();

    const init = `${apellido.charAt(0)}${nombre.charAt(0)}`.toUpperCase();
    return init || 'U';
  };

  const getNombreCompleto = () => {
    if (datos?.nombreCompleto?.trim()) return datos.nombreCompleto.trim();

    const nombre = (datos?.nombre ?? '').trim();
    const apellido = (datos?.apellido ?? '').trim();

    if (apellido || nombre) return [apellido, nombre].filter(Boolean).join(', ');
    return 'USUARIO';
  };

  const getNombreUsuario = () => {
    const uname =
      usuario?.username?.trim() ||
      usuario?.userName?.trim() ||
      usuario?.logon?.trim();

    if (uname) return uname.startsWith('@') ? uname : `@${uname}`;

    const mr = (usuario?.matricula ?? datos?.mr ?? '').trim();
    return mr ? `@${mr}` : '@usuario';
  };

  const getJerarquia = () => {
    return datos?.jerarquia?.trim() || null;
  };

  return {
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleLogout,
    handleEditarPerfil,
    handlePreferencias,
    userInfo: {
      iniciales: getIniciales(),
      nombreCompleto: getNombreCompleto(),
      nombreUsuario: getNombreUsuario(),
      rango: getJerarquia(),
    },
  };
};
