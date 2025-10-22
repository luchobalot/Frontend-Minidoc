import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { WelcomePaper, CheckIconBox, LoadingDot } from './Login.styles';

export const WelcomeScreen = ({ userData }) => {
  return (
    <WelcomePaper elevation={0}>
      <Box textAlign="center" py={2}>
        <CheckIconBox>
          <CheckCircle />
        </CheckIconBox>
        
        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
          mb={2}
        >
          Bienvenido!
        </Typography>
        
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          mb={1}
        >
          {userData?.rank && (
            <Box component="span" color="secondary.main" fontWeight={700}>
              {userData.rank}{' '}
            </Box>
          )}
          {userData?.firstName || ''} {userData?.lastName || ''}
        </Typography>
        
        <Typography
          variant="body2"
          mb={3}
          sx={{ color: (theme) => alpha(theme.palette.text.secondary, 0.7) }}
        >
          Accediendo al sistema MINIDOC...
        </Typography>
        
        <Box display="flex" gap={1} justifyContent="center">
          <LoadingDot delay={0} />
          <LoadingDot delay={0.15} />
          <LoadingDot delay={0.3} />
        </Box>
      </Box>
    </WelcomePaper>
  );
};