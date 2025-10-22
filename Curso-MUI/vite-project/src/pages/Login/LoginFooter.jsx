import React from 'react';
import { Box, Typography, alpha } from '@mui/material';

export const LoginFooter = () => {
  return (
    <Box 
      mt={3}
      pt={2.5}
      borderTop="1px solid"
      borderColor={(theme) => alpha(theme.palette.secondary.main, 0.2)}
      textAlign="center"
      sx={{ 
        '@media (max-height: 750px)': { mt: 2, pt: 2 }
      }}
    >
      <Typography 
        variant="caption" 
        sx={{ 
          color: (theme) => alpha(theme.palette.text.secondary, 0.6),
          fontSize: '0.75rem',
          display: 'block',
          lineHeight: 1.4,
        }}
      >
        Servicio de Analisis Operativo, Armas y Guerra Electronica
      </Typography>
    </Box>
  );
};