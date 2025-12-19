import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

// Función helper para obtener colores del theme
const getColorFromTheme = (theme, color) => {
  const colorMap = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
    info: theme.palette.info,
  };
  return colorMap[color] || colorMap.primary;
};

// Card Principal
export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'cardColor' && prop !== 'disabled',
})(({ theme, cardColor = 'primary', disabled = false }) => {
  const colorPalette = getColorFromTheme(theme, cardColor);

  return {
    padding: theme.spacing(4, 3.5),
    borderRadius: theme.shape.borderRadius * 2,
    
    // CAMBIO AQUÍ: Borde transparente para reservar el espacio sin que se vea gris
    border: '2px solid transparent', 
    
    transition: 'all 0.25s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    overflow: 'hidden',
    // Ajusté un poco la sombra inicial para que la tarjeta se distinga suavemente del fondo blanco sin borde
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', 
    background: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '240px',
    opacity: disabled ? 0.6 : 1,

    '&:hover': disabled ? {} : {
      transform: 'translateY(-2px)',
      // AQUÍ: El borde transparente se "pinta" del color principal
      borderColor: colorPalette.main, 
      boxShadow: '0 12px 24px -4px rgba(0, 0, 0, 0.12)',
    },

    '&:active': {
      transform: disabled ? 'none' : 'translateY(0px)',
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      minHeight: '220px',
    },
  };
});

// Contenedor del Icono
export const CardIconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cardColor',
})(({ theme, cardColor = 'primary' }) => {
  const colorPalette = getColorFromTheme(theme, cardColor);

  return {
    width: '56px',
    height: '56px',
    borderRadius: theme.shape.borderRadius * 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2.5),
    transition: 'all 0.3s ease',
    background: `${colorPalette.main}15`,
    color: colorPalette.main,
    fontSize: '28px',

    '& svg': {
      fontSize: '28px',
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
export const CardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// Botón de "Acceder" con flecha
export const CardActionButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cardColor',
})(({ theme, cardColor = 'primary' }) => {
  const colorPalette = getColorFromTheme(theme, cardColor);

  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    color: colorPalette.main,
    fontWeight: 600,
    fontSize: '0.8125rem',
    transition: 'all 0.3s ease',

    '& .arrow-icon': {
      transform: 'translateX(0)',
      transition: 'transform 0.3s ease',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
    },

    [`${StyledCard}:hover &`]: {
      '& .arrow-icon': {
        transform: 'translateX(4px)',
      },
    },
  };
});

// Estadísticas (opcional)
export const CardStats = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cardColor',
})(({ theme, cardColor = 'primary' }) => {
  const colorPalette = getColorFromTheme(theme, cardColor);
  
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
    fontWeight: 500,

    '& svg': {
      fontSize: '16px',
      color: colorPalette.main,
    },
  };
});