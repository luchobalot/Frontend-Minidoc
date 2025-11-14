// src/components/layout/Sidebar/configs/sidebarUsuarios.jsx
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SecurityIcon from '@mui/icons-material/Security';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BusinessIcon from '@mui/icons-material/Business';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GridViewIcon from '@mui/icons-material/GridView';

export const sidebarUsuarios = [
  {
    id: 'inicio',
    title: 'Panel Principal',
    items: [
      { id: 'usuarios-home', icon: <GridViewIcon fontSize="small" />, text: 'Panel Principal' }
    ]
  },
  {
    
    id: 'listado',
    title: 'Listado y Consultas',
    items: [
      { id: 'listado-general', icon: <GroupIcon fontSize="small" />, text: 'Listado General' },
      { id: 'busqueda-avanzada', icon: <SearchIcon fontSize="small" />, text: 'Búsqueda Avanzada' },
    ]
  },
  {
    id: 'gestion',
    title: 'Gestión',
    items: [
      { id: 'agregar-usuario', icon: <PersonAddIcon fontSize="small" />, text: 'Agregar Usuario' },
      { id: 'modificar-usuario', icon: <EditIcon fontSize="small" />, text: 'Modificar Usuario' },
      { id: 'movimientos', icon: <SwapHorizIcon fontSize="small" />, text: 'Historial de Movimientos' },
    ]
  },
  {
    id: 'permisos',
    title: 'Permisos y Accesos',
    items: [
      { id: 'otorgar-permisos', icon: <SecurityIcon fontSize="small" />, text: 'Otorgar Permisos' },
      { id: 'control-accesos', icon: <LockOpenIcon fontSize="small" />, text: 'Control de Accesos' },
    ]
  },
  {
    id: 'organizacion',
    title: 'Organización',
    items: [
      { id: 'usuarios-organica', icon: <BusinessIcon fontSize="small" />, text: 'Usuarios en Orgánica' },
      { id: 'estructura-jerarquica', icon: <AccountTreeIcon fontSize="small" />, text: 'Estructura Jerárquica' },
    ]
  }
];
