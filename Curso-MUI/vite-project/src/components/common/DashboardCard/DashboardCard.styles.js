import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Mapa de colores según el prop 'color'
const colorMap = {
  primary: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    bg: 'rgba(59, 130, 246, 0.1)',
    bgDark: 'rgba(37, 99, 235, 0.05)',
    border: 'rgba(59, 130, 246, 0.2)',
    shadow: 'rgba(59, 130, 246, 0.15)',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
    bg: 'rgba(16, 185, 129, 0.1)',
    bgDark: 'rgba(5, 150, 105, 0.05)',
    border: 'rgba(16, 185, 129, 0.2)',
    shadow: 'rgba(16, 185, 129, 0.15)',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    bg: 'rgba(245, 158, 11, 0.1)',
    bgDark: 'rgba(217, 119, 6, 0.05)',
    border: 'rgba(245, 158, 11, 0.2)',
    shadow: 'rgba(245, 158, 11, 0.15)',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    bg: 'rgba(239, 68, 68, 0.1)',
    bgDark: 'rgba(220, 38, 38, 0.05)',
    border: 'rgba(239, 68, 68, 0.2)',
    shadow: 'rgba(239, 68, 68, 0.15)',
  },
  info: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    bg: 'rgba(59, 130, 246, 0.1)',
    bgDark: 'rgba(37, 99, 235, 0.05)',
    border: 'rgba(59, 130, 246, 0.2)',
    shadow: 'rgba(59, 130, 246, 0.15)',
  },
};

// Card Principal
export const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'disabled',
})(({ color = 'primary', disabled = false }) => {
  const colors = colorMap[color] || colorMap.primary;

  return {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '280px',
    opacity: disabled ? 0.5 : 1,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: `linear-gradient(90deg, ${colors.main}, ${colors.dark})`,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease',
    },

    '&:hover': disabled ? {} : {
      transform: 'translateY(-8px)',
      boxShadow: `0 12px 24px ${colors.shadow}`,
      borderColor: colors.main,

      '&::before': {
        transform: 'scaleX(1)',
      },
    },

    '@media (max-width: 768px)': {
      minHeight: '240px',
      padding: '24px',
    },

    animation: 'fadeInUp 0.5s ease-out',
    '@keyframes fadeInUp': {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  };
});

// Contenedor del Icono
export const CardIconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ color = 'primary' }) => {
  const colors = colorMap[color] || colorMap.primary;

  return {
    width: '80px',
    height: '80px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
    background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bgDark} 100%)`,
    border: `2px solid ${colors.border}`,
    color: colors.main,
    fontSize: '40px',

    '& svg': {
      fontSize: '40px',
    },

    [`${StyledCard}:hover &`]: {
      transform: 'scale(1.1) rotate(5deg)',
    },
  };
});

// Contenido de la Card
export const CardContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

// Footer de la Card
export const CardFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '16px',
  borderTop: '1px solid #F3F4F6',
});

// Estadísticas (opcional)
export const CardStats = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ color = 'primary' }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.875rem',
  color: '#9CA3AF',

  '& svg': {
    fontSize: '18px',
  },
}));

// Flecha de navegación
export const CardArrow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'disabled',
})(({ color = 'primary', disabled = false }) => {
  const colors = colorMap[color] || colorMap.primary;

  return {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    fontSize: '20px',
    background: colors.bg,
    color: colors.main,

    '& svg': {
      fontSize: '20px',
    },

    [`${StyledCard}:hover &`]: disabled ? {} : {
      transform: 'translateX(4px)',
    },
  };
});