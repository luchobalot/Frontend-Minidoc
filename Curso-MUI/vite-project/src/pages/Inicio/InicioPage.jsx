// src/pages/Inicio/InicioPage.jsx
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
  DashboardGrid,
} from './Inicio.styles';
import DashboardCard from '../../components/common/DashboardCard/DashboardCard';

const InicioPage = () => {
  const { user, handleLogout, dashboardCards } = useInicioPage();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F2F4F7' }}>
      {/* AppBar independiente sin Sidebar */}
      <PrimaryAppBar
        sidebarOpen={false}
        onMenuClick={() => {}}
        user={user}
        onLogout={handleLogout}
        showUserMenu={true}
        // Ocultar botón de menú hamburguesa si no hay sidebar en inicio
        hideMenuButton={true} 
      />

      {/* Contenido Principal */}
      <MainContent>
        <HeroSection>
          <HeroContent>
            <HeroTextContainer>
              <GreetingText>
                Bienvenido al Sistema MINIDOC
              </GreetingText>
              <UserNameText>
                {user?.rank} {user?.lastName} {user?.firstName}
              </UserNameText>
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