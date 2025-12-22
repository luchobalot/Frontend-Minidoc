// src/pages/MiPerfil/MiPerfilPage.jsx
import React from 'react';
import { Box, Typography, Grid, Divider, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GavelIcon from '@mui/icons-material/Gavel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ContentHeader from '../../../components/common/ContentHeader/ContentHeader';
import { useMiPerfil } from './useMiPerfil';
import {
  ProfileContainer,
  ProfileHeader,
  StyledAvatar,
  InfoCard,
  InfoRow,
  InfoLabel,
  InfoValue,
  StatusChip,
} from './MiPerfil.styles';

const MiPerfilPage = () => {
  const { userInfo } = useMiPerfil();

  return (
    <>
      <ContentHeader title="Mi Perfil" breadcrumbs={['Inicio', 'Mi Perfil']} />

      <ProfileContainer>
        {/* Header Card */}
        <ProfileHeader elevation={0}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
            <StyledAvatar>{userInfo.iniciales}</StyledAvatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#fff' }}>
                {userInfo.nombreCompleto}
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', mb: 2.5, opacity: 0.95, color: '#fff' }}>
                @{userInfo.logon}
              </Typography>
              
              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                <StatusChip 
                  label={userInfo.jerarquia} 
                  color="info"
                  icon={<BadgeIcon />}
                />
                <StatusChip 
                  label={userInfo.nivel} 
                  color="success"
                  icon={<SecurityIcon />}
                />
              </Stack>
            </Box>
          </Box>
        </ProfileHeader>

        {/* Content Grid */}
        <Grid container spacing={3}>
          {/* Información Personal */}
          <Grid item xs={12} md={6}>
            <InfoCard elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Información Personal
              </Typography>
              
              <Stack spacing={2.5}>
                <InfoRow>
                  <InfoLabel>
                    <PersonIcon />
                    Nombre Completo
                  </InfoLabel>
                  <InfoValue>{userInfo.nombreCompleto}</InfoValue>
                </InfoRow>

                <Divider />

                <InfoRow>
                  <InfoLabel>
                    <AssignmentIndIcon />
                    Usuario
                  </InfoLabel>
                  <InfoValue>@{userInfo.logon}</InfoValue>
                </InfoRow>

                <Divider />

                <InfoRow>
                  <InfoLabel>
                    <FingerprintIcon />
                    Matrícula de Revista
                  </InfoLabel>
                  <InfoValue>{userInfo.matriculaRevista}</InfoValue>
                </InfoRow>
              </Stack>
            </InfoCard>
          </Grid>

          {/* Información Profesional */}
          <Grid item xs={12} md={6}>
            <InfoCard elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Información Profesional
              </Typography>
              
              <Stack spacing={2.5}>
                <InfoRow>
                  <InfoLabel>
                    <BadgeIcon />
                    Jerarquía
                  </InfoLabel>
                  <InfoValue>{userInfo.jerarquia}</InfoValue>
                </InfoRow>

                <Divider />

                <InfoRow>
                  <InfoLabel>
                    <WorkIcon />
                    Cargo
                  </InfoLabel>
                  <InfoValue>{userInfo.cargo}</InfoValue>
                </InfoRow>

                <Divider />

                <InfoRow>
                  <InfoLabel>
                    <SecurityIcon />
                    Nivel de Acceso
                  </InfoLabel>
                  <InfoValue>{userInfo.nivel}</InfoValue>
                </InfoRow>
              </Stack>
            </InfoCard>
          </Grid>

          {/* Destino y Ubicación */}
          <Grid item xs={12}>
            <InfoCard elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Destino y Ubicación
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <InfoRow>
                    <InfoLabel>
                      <BusinessIcon />
                      Destino
                    </InfoLabel>
                    <InfoValue>{userInfo.destino}</InfoValue>
                  </InfoRow>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InfoRow>
                    <InfoLabel>
                      <LocationOnIcon />
                      Ubicación Orgánica
                    </InfoLabel>
                    <InfoValue>{userInfo.ubicacionOrganica}</InfoValue>
                  </InfoRow>
                </Grid>
              </Grid>
            </InfoCard>
          </Grid>

          {/* Permisos y Clasificación */}
          <Grid item xs={12}>
            <InfoCard elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Permisos y Clasificación
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6} md={3}>
                  <InfoRow>
                    <InfoLabel>
                      <SecurityIcon />
                      Clasificación
                    </InfoLabel>
                    <Box sx={{ mt: 1 }}>
                      <StatusChip 
                        label={userInfo.tipoClasificacion} 
                        color="warning"
                      />
                    </Box>
                  </InfoRow>
                </Grid>

                <Grid item xs={6} sm={6} md={3}>
                  <InfoRow>
                    <InfoLabel>
                      <VerifiedUserIcon />
                      Confianza
                    </InfoLabel>
                    <Box sx={{ mt: 1 }}>
                      <StatusChip 
                        label={userInfo.confianza ? "Activa" : "Inactiva"} 
                        color={userInfo.confianza ? "success" : "error"}
                      />
                    </Box>
                  </InfoRow>
                </Grid>

                <Grid item xs={6} sm={6} md={3}>
                  <InfoRow>
                    <InfoLabel>
                      <VerifiedUserIcon />
                      Super Confianza
                    </InfoLabel>
                    <Box sx={{ mt: 1 }}>
                      <StatusChip 
                        label={userInfo.superConfianza ? "Activa" : "Inactiva"} 
                        color={userInfo.superConfianza ? "success" : "error"}
                      />
                    </Box>
                  </InfoRow>
                </Grid>

                <Grid item xs={6} sm={6} md={3}>
                  <InfoRow>
                    <InfoLabel>
                      <GavelIcon />
                      Justicia
                    </InfoLabel>
                    <Box sx={{ mt: 1 }}>
                      <StatusChip 
                        label={userInfo.justicia ? "Activa" : "Inactiva"} 
                        color={userInfo.justicia ? "success" : "error"}
                      />
                    </Box>
                  </InfoRow>
                </Grid>
              </Grid>
            </InfoCard>
          </Grid>
        </Grid>
      </ProfileContainer>
    </>
  );
};

export default MiPerfilPage;