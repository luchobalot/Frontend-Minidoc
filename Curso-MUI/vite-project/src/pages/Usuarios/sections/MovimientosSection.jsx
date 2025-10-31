// src/pages/Usuarios/sections/MovimientosSection.jsx
import React from 'react';
import { Box } from '@mui/material';
import ContentHeader from '../../../components/common/ContentHeader/ContentHeader';
import MovimientosUsuarios from '../../../components/common/MovimientosUsuarios/MovimientosUsuarios';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Seccion de movimientos y auditoria
 */
export const MovimientosSection = ({ onRefresh, breadcrumbs = [] }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px' }}>
      <ContentHeader
        title="Movimientos y Auditoria"
        description="Registro completo de todos los cambios realizados en la seccion de Usuarios."
        breadcrumbs={breadcrumbs}
        actions={[
          {
            label: 'Actualizar',
            icon: <RefreshIcon />,
            variant: 'outlined',
            onClick: onRefresh,
          },
        ]}
      />
      <MovimientosUsuarios />
    </Box>
  );
};