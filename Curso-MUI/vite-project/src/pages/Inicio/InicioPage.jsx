import React from 'react';
import { Box } from '@mui/material';
import PrimaryAppBar from '../../components/layout/AppBar/PrimaryAppBar';
import { useInicioPage } from './useInicioPage';
import {
  MainContent,
  PageHeader,
  WelcomeTitle,
  WelcomeSubtitle,
  DashboardGrid,
} from './Inicio.styles';
import DashboardCard from '../../components/common/DashboardCard/DashboardCard';

// Iconos
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import PendingIcon from '@mui/icons-material/Pending';

const InicioPage = () => {
  const { user, handleLogout, dashboardCards } = useInicioPage();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F2F4F7' }}>
      {/* AppBar */}
      <PrimaryAppBar
        sidebarOpen={false}
        onMenuClick={() => {}}
        user={user}
        onLogout={handleLogout}
        showUserMenu={true}
      />

      {/* Contenido Principal */}
      <MainContent>
        {/* Header de Bienvenida */}
        <PageHeader>
          <WelcomeTitle>
            Bienvenido al Sistema MINIDOC
          </WelcomeTitle>
          <WelcomeSubtitle>
            Sistema de Gestion y Distribucion de GFH
          </WelcomeSubtitle>
        </PageHeader>

        {/* Grid de Cards */}
        <DashboardGrid>
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              route={card.route}
              color={card.color}
              statsLabel={card.statsLabel}
              statsIcon={card.statsIcon}
              disabled={card.disabled}
            />
          ))}
        </DashboardGrid>
      </MainContent>
    </Box>
  );
};

export default InicioPage;