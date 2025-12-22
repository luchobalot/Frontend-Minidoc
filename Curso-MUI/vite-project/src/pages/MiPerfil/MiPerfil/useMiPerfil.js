// src/pages/MiPerfil/useMiPerfil.js
import { useAuthStore } from '../../../stores/useAuthStore';

export const useMiPerfil = () => {
  const { user } = useAuthStore();

  const mockUser = {
    id: 1,
    apellido: 'BALOT',
    nombre: 'Luciano Nicolás',
    logon: 'luchobalot',
    jerarquia: 'Marinero Primero',
    destino: 'Servicio de Análisis Operativo Armas y Guerra Electrónica (SIAG)',
    nivel: 'Superadministrador',
    matriculaRevista: '451341-5',
    confianza: true,
    superConfianza: true,
    justicia: true,
    tipoClasificacion: 'Reservado',
    ubicacionOrganica: 'Departamento SIO',
    cargo: 'Auxiliar Producción MINIDOC',
  };

  const userData = user || mockUser;

  const getIniciales = () => {
    if (userData?.nombre && userData?.apellido) {
      return `${userData.nombre.charAt(0)}${userData.apellido.charAt(0)}`.toUpperCase();
    }
    return "U";
  };

  const getNombreCompleto = () => {
    if (userData?.nombre && userData?.apellido) {
      return `${userData.nombre} ${userData.apellido}`;
    }
    return "Usuario";
  };

  const userInfo = {
    iniciales: getIniciales(),
    nombreCompleto: getNombreCompleto(),
    logon: userData?.logon || 'usuario',
    jerarquia: userData?.jerarquia || 'Sin jerarquía',
    nivel: userData?.nivel || 'Usuario',
    matriculaRevista: userData?.matriculaRevista || 'N/A',
    cargo: userData?.cargo || 'Sin cargo asignado',
    destino: userData?.destino || 'Sin destino asignado',
    ubicacionOrganica: userData?.ubicacionOrganica || 'Sin ubicación asignada',
    tipoClasificacion: userData?.tipoClasificacion || 'Sin clasificación',
    confianza: userData?.confianza !== undefined ? userData.confianza : false,
    superConfianza: userData?.superConfianza !== undefined ? userData.superConfianza : false,
    justicia: userData?.justicia !== undefined ? userData.justicia : false,
  };

  return {
    userInfo,
  };
};