import React from 'react';
import { Box } from '@mui/material';
import PrimaryAppBar from '../../components/layout/AppBar/PrimaryAppBar';
import { useInicioPage } from './useInicioPage';
import {
  MainContent,
  HeroSection,
  HeroContent,
  HeroTextContainer,
  GreetingText,
  UserNameText,
  SystemDescription,
  DashboardGrid,
} from './Inicio.styles';
import DashboardCard from '../../components/common/DashboardCard/DashboardCard';

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
        {/* Hero Section Mejorado */}
        <HeroSection>
          <HeroContent>
            <HeroTextContainer>
              <GreetingText>
                Bienvenido al Sistema
              </GreetingText>
              <UserNameText>
                MI Balot Luciano
              </UserNameText>
              <SystemDescription>
                Sistema de Gestión y Distribución de GFH - MINIDOC
              </SystemDescription>
            </HeroTextContainer>
          </HeroContent>
        </HeroSection>

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