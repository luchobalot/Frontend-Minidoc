import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const useInicioPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const dashboardCards = [
    {
      title: 'Gestión de Usuarios',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      icon: GroupIcon,
      route: '/usuarios',
      color: 'primary',
      disabled: false,
    },
    {
      title: 'Mesa de Trabajo',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      icon: WorkIcon,
      route: '/mesa-trabajo',
      color: 'success',
      disabled: false,
    },
    {
      title: 'Gestión del Sistema',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      icon: AdminPanelSettingsIcon,
      route: '/gestion-sistema',
      color: 'warning',
      disabled: false,
    },
    {
      title: 'Configuración',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      icon: SettingsIcon,
      route: '/configuracion',
      color: 'error',
      disabled: false,
    },
  ];

  return {
    user,
    handleLogout,
    dashboardCards,
  };
};