// src/pages/Usuarios/sections/AgregarUsuarioSection.jsx
import React from 'react';
import { Box } from '@mui/material';
import ContentHeader from '../../../components/common/ContentHeader/ContentHeader';
import CreateUsersForm from '../../../components/common/CreateUsersForm/CreateUsersForm';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Sección para agregar usuario
 */
export const AgregarUsuarioSection = ({ onSubmit, onClear }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px' }}>
      <ContentHeader
        title="Agregar Usuario"
        description="Complete el formulario para registrar un nuevo usuario en el sistema."
        actions={[
          {
            label: 'Limpiar formulario',
            icon: <DeleteIcon />,
            onClick: onClear,
          },
        ]}
      />
      <CreateUsersForm onSubmit={onSubmit} />
    </Box>
  );
};