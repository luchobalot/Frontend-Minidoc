// src/pages/Usuarios/sections/ListadoGeneralSection.jsx
import React from 'react';
import { Box } from '@mui/material';
import ContentHeader from '../../../components/common/ContentHeader/ContentHeader';
import UsuariosTable from '../../../components/tables/UsuariosTable/UsuariosTable';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Sección de listado general de usuarios
 */
export const ListadoGeneralSection = ({
  usuarios,
  loading,
  onView,
  onEdit,
  onDelete,
  onAddNew,
  onRefresh,
}) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px' }}>
      <ContentHeader
        title="Listado General de Usuarios"
        description="Visualizar todos los usuarios registrados en el sistema MINIDOC."
        actions={[
          {
            label: 'Nuevo Usuario',
            icon: <AddIcon />,
            color: 'success',
            onClick: onAddNew,
          },
          {
            label: 'Actualizar',
            icon: <RefreshIcon />,
            variant: 'outlined',
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