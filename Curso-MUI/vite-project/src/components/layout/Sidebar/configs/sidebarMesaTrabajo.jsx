// src/components/layout/Sidebar/configs/sidebarMesaTrabajo.jsx
import GridViewIcon from '@mui/icons-material/GridView';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DownloadIcon from '@mui/icons-material/Download';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArchiveIcon from '@mui/icons-material/Archive';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import PublishIcon from '@mui/icons-material/Publish';

export const sidebarMesaTrabajo = [
  {
    id: 'inicio',
    title: 'Panel Principal',
    items: [
      { id: 'mesa-trabajo-home', icon: <GridViewIcon fontSize="small" />, text: 'Panel Principal' }
    ]
  },
  {
    id: 'mensajes',
    title: 'Mensajes',
    items: [
      { id: 'conocimiento', icon: <FolderOpenIcon fontSize="small" />, text: 'Conocimiento' },
      { id: 'recibidos', icon: <DownloadIcon fontSize="small" />, text: 'Recibidos' },
      { id: 'girados', icon: <SwapHorizIcon fontSize="small" />, text: 'Girados' },
      { id: 'transmitidos', icon: <PlayArrowIcon fontSize="small" />, text: 'Transmitidos' },
      { id: 'archivados', icon: <ArchiveIcon fontSize="small" />, text: 'Archivados' },
    ]
  },
  {
    id: 'acciones',
    title: 'Acciones',
    items: [
      { id: 'busqueda-avanzada', icon: <SearchIcon fontSize="small" />, text: 'Búsqueda Avanzada' },
      { id: 'cargar-recibidos', icon: <UploadIcon fontSize="small" />, text: 'Cargar Recibidos' },
      { id: 'cargar-transmitidos', icon: <PublishIcon fontSize="small" />, text: 'Cargar Transmitidos' },
    ]
  }
];