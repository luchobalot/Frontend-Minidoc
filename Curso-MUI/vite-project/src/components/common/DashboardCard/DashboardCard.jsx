import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {
  StyledCard,
  CardIconContainer,
  CardContent,
  CardFooter,
  CardActionButton,
  CardStats,
} from './DashboardCard.styles';

/**
 * Componente reutilizable de tarjeta para dashboard
 * Usa el theme.js para todos los estilos y colores
 * 
 * @param {string} title - Título de la card
 * @param {string} description - Descripción de la card
 * @param {React.Component} icon - Componente de ícono
 * @param {string} route - Ruta a navegar
 * @param {string} color - Color del theme (primary, success, warning, error, info)
 * @param {string} statsLabel - Texto de estadísticas opcional
 * @param {React.Component} statsIcon - Ícono de estadísticas opcional
 * @param {boolean} disabled - Si la card está deshabilitada
 * @param {Function} onClick - Handler personalizado opcional
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
      cardColor={color} 
      disabled={disabled}
      onClick={handleClick}
    >
      <CardIconContainer cardColor={color}>
        {Icon && <Icon />}
      </CardIconContainer>

      <CardContent>
        <Typography
          variant="h6"
          sx={(theme) => ({
            fontSize: '1.125rem',
            fontWeight: 700,
            color: theme.palette.text.primary,
            marginBottom: 1,
            lineHeight: 1.2,
          })}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={(theme) => ({
            fontSize: '0.875rem',
            color: theme.palette.text.secondary,
            lineHeight: 1.5,
            marginBottom: 2.5,
            flex: 1,
          })}
        >
          {description}
        </Typography>
      </CardContent>

      <CardFooter>
        {statsLabel ? (
          <CardStats cardColor={color}>
            {StatsIcon && <StatsIcon />}
            <span>{statsLabel}</span>
          </CardStats>
        ) : (
          <div />
        )}

        <CardActionButton cardColor={color}>
          {disabled ? (
            <>
              <LockIcon sx={{ fontSize: '16px' }} />
              <span>Bloqueado</span>
            </>
          ) : (
            <>
              <span>Acceder</span>
              <span className="arrow-icon">→</span>
            </>
          )}
        </CardActionButton>
      </CardFooter>
    </StyledCard>
  );
};

export default DashboardCard;