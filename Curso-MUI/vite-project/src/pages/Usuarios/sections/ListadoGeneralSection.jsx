import React from 'react';
import { Box } from '@mui/material';
import ContentHeader from '../../../components/common/ContentHeader/ContentHeader';
import UsuariosTable from '../../../components/tables/UsuariosTable/UsuariosTable';

// Íconos
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileUploadIcon from '@mui/icons-material/FileUpload';

// Sección de listado general de usuarios
export const ListadoGeneralSection = ({
  usuarios,
  loading,
  onView,
  onEdit,
  onDelete,
  onAddNew,
  onRefresh,
  breadcrumbs = [],
}) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px' }}>
      <ContentHeader
        title="Listado General de Usuarios"
        description="Visualizar todos los usuarios registrados en el sistema."
        breadcrumbs={breadcrumbs}
        actions={[
          {
            label: 'Nuevo Usuario',
            icon: <AddIcon />,
            color: 'success',
            onClick: onAddNew,
          },
          {
            label: 'Exportar',
            icon: <FileUploadIcon />,
            variant: 'outlined',
          },
          {
            label: '',
            icon: <RefreshIcon />,
            variant: 'outlined',
            tooltip: 'Actualizar',
            onClick: onRefresh,
          },
        ]}
      />

      <UsuariosTable
        usuarios={usuarios}
        loading={loading}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Box>
  );
};
