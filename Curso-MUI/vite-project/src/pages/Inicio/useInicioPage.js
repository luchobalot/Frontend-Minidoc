import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

// Iconos para las cards
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import PendingIcon from '@mui/icons-material/Pending';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const useInicioPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Configuración de las cards del dashboard
  const dashboardCards = [
    {
      title: 'Gestión de Usuarios',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      icon: GroupIcon,               
      route: '/usuarios',
      color: 'primary',       
    },
    {
      title: 'Mesa de Trabajo',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      icon: WorkIcon,
      route: '/mesatrabajo',
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