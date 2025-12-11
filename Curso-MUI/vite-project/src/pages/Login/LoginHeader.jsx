import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { Email } from '@mui/icons-material';
import { LogoBox } from './Login.styles';

export const LoginHeader = () => {
  return (
    <Box 
      textAlign="center" 
      mb={3}
      sx={{ 
        '@media (max-height: 750px)': { mb: 2 }
      }}
    >
      <LogoBox>
        <Email />
      </LogoBox>
      <Typography
        variant="h3"
        fontWeight={700}
        color="text.primary"
        mb={0.75}
        sx={{ 
          fontSize: '2rem', 
          letterSpacing: '0.5px',
          '@media (max-height: 750px)': {
            fontSize: '1.75rem',
            mb: 0.5,
          },
        }}
      >
        MINIDOC
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: (theme) => alpha(theme.palette.text.secondary, 0.7),
          fontSize: '0.875rem',
          fontWeight: 400,
          '@media (max-height: 750px)': {
            fontSize: '0.8rem',
          },
        }}
      >
        Sistema de Gestion y Distribucion de Mensajería
      </Typography>
    </Box>
  );
};