import React from 'react';
import { Card, CardContent, Typography, Box, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'cardColor' && prop !== 'disabled',
})(({ theme, cardColor, disabled }) => {
  const baseColor = theme.palette[cardColor]?.main || theme.palette.primary.main;
  
  return {
    position: 'relative',
    height: '100%',
    minHeight: '200px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: theme.palette.background.paper,
    border: `1px solid ${alpha(baseColor, 0.1)}`,
    borderRadius: '16px',
    overflow: 'hidden',
    opacity: disabled ? 0.6 : 1,
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: `linear-gradient(90deg, ${baseColor}, ${alpha(baseColor, 0.6)})`,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `radial-gradient(circle at top right, ${alpha(baseColor, 0.05)}, transparent 70%)`,
      opacity: 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none',
    },

    '&:hover': disabled ? {} : {
      transform: 'translateY(-8px)',
      boxShadow: `0 12px 24px ${alpha(baseColor, 0.15)}, 0 0 0 1px ${alpha(baseColor, 0.2)}`,
      
      '&::before': {
        transform: 'scaleX(1)',
      },

      '&::after': {
        opacity: 1,
      },

      '& .card-icon': {
        transform: 'scale(1.1) rotate(5deg)',
      },

      '& .arrow-icon': {
        transform: 'translateX(4px)',
        opacity: 1,
      },
    },

    '&:active': disabled ? {} : {
      transform: 'translateY(-4px)',
    },
  };
});

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'iconColor',
})(({ theme, iconColor }) => {
  const baseColor = theme.palette[iconColor]?.main || theme.palette.primary.main;
  
  return {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: `linear-gradient(135deg, ${alpha(baseColor, 0.1)}, ${alpha(baseColor, 0.05)})`,
    border: `1px solid ${alpha(baseColor, 0.15)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
    
    '& .MuiSvgIcon-root': {
      fontSize: '28px',
      color: baseColor,
      transition: 'transform 0.3s ease',
    },
  };
});

const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '12px',
});

const ArrowIconStyled = styled(ArrowForwardIcon)(({ theme }) => ({
  fontSize: '20px',
  color: theme.palette.text.secondary,
  opacity: 0,
  transition: 'all 0.3s ease',
}));

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  route,
  color = 'primary',
  disabled = false,
  onClick,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <StyledCard 
      cardColor={color} 
      disabled={disabled}
      onClick={handleClick}
      elevation={0}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader>
          <IconContainer iconColor={color} className="card-icon">
            {Icon && <Icon />}
          </IconContainer>
          <ArrowIconStyled className="arrow-icon" />
        </CardHeader>

        <Typography
          variant="h6"
          sx={(theme) => ({
            fontWeight: 600,
            color: theme.palette.text.primary,
            marginBottom: '8px',
            lineHeight: 1.3,
          })}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            flexGrow: 1,
          })}
        >
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default DashboardCard;