import React from 'react';
import { Box } from '@mui/material';
import PrimaryAppBar from '../../components/layout/AppBar/PrimaryAppBar';
import { useInicioPage } from './useInicioPage';
import {
  MainContent,
  DashboardGrid,
  DashboardCardStyled,
  CardIconContainer,
  CardTitle,
  CardDescription,
  CardFooter,
} from './Inicio.styles';

const InicioPage = () => {
  const { user, handleLogout, dashboardCards } = useInicioPage();

  const getColorScheme = (color) => {
    const colors = {
      primary: { bg: '#eff6ff', text: '#0c4a6e', border: '#0ea5e9' },
      success: { bg: '#f0fdf4', text: '#166534', border: '#22c55e' },
      warning: { bg: '#fffbeb', text: '#92400e', border: '#f59e0b' },
      error: { bg: '#fef2f2', text: '#991b1b', border: '#ef4444' },
      info: { bg: '#f3f4f6', text: '#1f2937', border: '#6366f1' },
    };
    return colors[color] || colors.primary;
  };

  const handleCardClick = (route) => {
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
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
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            const colorScheme = getColorScheme(card.color);

            return (
              <DashboardCardStyled
                key={index}
                onClick={() => !card.disabled && handleCardClick(card.route)}
                className={card.disabled ? 'disabled' : ''}
              >
                <CardIconContainer
                  sx={{
                    background: colorScheme.bg,
                    color: colorScheme.text,
                  }}
                >
                  <IconComponent />
                </CardIconContainer>

                <CardTitle sx={{ color: colorScheme.text }}>
                  {card.title}
                </CardTitle>

                <CardDescription>
                  {card.description}
                </CardDescription>

                <CardFooter>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: colorScheme.border,
                      fontWeight: 600,
                    }}
                  >
                    Acceder
                    <Box
                      sx={{
                        transform: 'translateX(0)',
                        transition: 'transform 0.3s ease',
                        fontSize: '16px',
                      }}
                    >
                      →
                    </Box>
                  </Box>
                </CardFooter>
              </DashboardCardStyled>
            );
          })}
        </DashboardGrid>
      </MainContent>
    </Box>
  );
};

export default InicioPage;