import React from 'react';
import { Typography, Switch, FormControlLabel, Box, Divider } from '@mui/material';
import ContentHeader from '../../../components/common/ContentHeader/ContentHeader';
import { usePreferencias } from './usePreferencias';
import { PreferencesContainer } from './Preferencias.styles';

const PreferenciasPage = () => {
  const { notificaciones, temaOscuro, toggleNotificaciones, toggleTema } = usePreferencias();

  return (
    <>
      <ContentHeader title="Preferencias" breadcrumbs={['Inicio', 'Mi Perfil', 'Preferencias']} />
      
      <PreferencesContainer elevation={0}>
        <Typography variant="h6" gutterBottom>Configuración de la cuenta</Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          
          <FormControlLabel
            control={<Switch checked={notificaciones} onChange={toggleNotificaciones} />}
            label="Recibir notificaciones por correo"
          />

          <Divider />

          <FormControlLabel
            control={<Switch checked={temaOscuro} onChange={toggleTema} />}
            label="Modo Oscuro (Beta)"
          />
          
        </Box>
      </PreferencesContainer>
    </>
  );
};

export default PreferenciasPage;