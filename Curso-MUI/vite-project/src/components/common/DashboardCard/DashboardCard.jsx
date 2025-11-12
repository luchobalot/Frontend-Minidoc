import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import {
  StyledCard,
  CardIconContainer,
  CardContent,
  CardFooter,
  CardStats,
  CardArrow,
} from './DashboardCard.styles';

/**
 * Componente genérico de tarjeta para dashboard
 * 
 * @param {string} title - Título de la card
 * @param {string} description - Descripción de la card
 * @param {React.Component} icon - Componente de ícono (ej: GroupIcon)
 * @param {string} route - Ruta a navegar
 * @param {string} color - Color principal
 * @param {string} statsLabel - Texto de estadísticas
 * @param {React.Component} statsIcon - Componente de ícono para estadísticas
 * @param {boolean} disabled - Si la card está deshabilitada
 * @param {Function} onClick - Handler personalizado
 */
const DashboardCard = ({
  title,
  description,
  icon: Icon,
  route,
  color = 'primary',
  statsLabel = null,
  statsIcon: StatsIcon = null,
  disabled = false,
  onClick = null,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    
    if (onClick) {
      onClick();
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <StyledCard 
      color={color} 
      disabled={disabled}
      onClick={handleClick}
    >
      <CardIconContainer color={color}>
        {Icon && <Icon />} {/* ← Antes era {icon} */}
      </CardIconContainer>

      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.9375rem',
            color: '#6B7280',
            lineHeight: 1.6,
            marginBottom: '24px',
            flex: 1,
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardFooter>
        {statsLabel && (
          <CardStats color={color}>
            {StatsIcon && (
              <Box sx={{ display: 'flex', fontSize: '18px' }}>
                <StatsIcon /> {/* ← Antes era {statsIcon} */}
              </Box>
            )}
            <span>{statsLabel}</span>
          </CardStats>
        )}
        {!statsLabel && <Box />}

        <CardArrow color={color} disabled={disabled}>
          {disabled ? <LockIcon /> : <ArrowForwardIcon />}
        </CardArrow>
      </CardFooter>
    </StyledCard>
  );
};

export default DashboardCard;
