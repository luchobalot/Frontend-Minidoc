import React from 'react';
import { Box } from '@mui/material';
import PrimaryAppBar from '../../components/layout/AppBar/PrimaryAppBar';
import DashboardCard from '../../components/common/DashboardCard/DashboardCard';
import DashboardFooter from './components/DashboardFooter';
import { useInicioPage } from './useInicioPage';
import { MainContent, DashboardGrid } from './Inicio.styles';

const InicioPage = () => {
  const { user, handleLogout, dashboardCards } = useInicioPage();

  const handleCardClick = (route) => {
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <Box sx={(theme) => ({ 
      minHeight: '100vh', 
      bgcolor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
    })}>
      <PrimaryAppBar
        sidebarOpen={false}
        onMenuClick={() => {}}
        user={user}
        onLogout={handleLogout}
        showUserMenu={true}
        hideMenuButton={true}
      />

      <MainContent>
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
              onClick={card.route ? () => handleCardClick(card.route) : null}
            />
          ))}
        </DashboardGrid>

        <DashboardFooter />
      </MainContent>
    </Box>
  );
};

export default InicioPage;