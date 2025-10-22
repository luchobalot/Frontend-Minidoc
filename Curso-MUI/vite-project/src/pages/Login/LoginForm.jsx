import React from 'react';
import { Box, Typography, Checkbox, InputAdornment, IconButton, CircularProgress, Collapse, Alert, alpha } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { StyledTextField, LoginButton, StyledFormControlLabel, StyledLink } from './Login.styles';

export const LoginForm = ({ 
  formData, 
  showPassword, 
  isLoading, 
  errorMessage, 
  onInputChange, 
  onSubmit, 
  onTogglePassword 
}) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Box 
        mb={2}
        sx={{ '@media (max-height: 750px)': { mb: 1.5 } }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            mb: 0.75,
            fontSize: '0.875rem'
          }}
        >
          Usuario
        </Typography>
        <StyledTextField
          fullWidth
          name="username"
          value={formData.username}
          onChange={onInputChange}
          placeholder="Ingrese su usuario"
          required
          disabled={isLoading}
          autoComplete="username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box 
        mb={2}
        sx={{ '@media (max-height: 750px)': { mb: 1.5 } }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            mb: 0.75,
            fontSize: '0.875rem'
          }}
        >
          Contrasena
        </Typography>
        <StyledTextField
          fullWidth
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={onInputChange}
          placeholder="Ingrese su contraseña"
          required
          disabled={isLoading}
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onTogglePassword}
                  edge="end"
                  disabled={isLoading}
                  sx={{ 
                    color: (theme) => alpha(theme.palette.text.secondary, 0.6),
                    '&:hover': {
                      color: (theme) => alpha(theme.palette.text.secondary, 0.8)
                    }
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Collapse in={!!errorMessage}>
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            color: '#FCA5A5',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: 1,
            fontSize: '0.875rem',
            '& .MuiAlert-icon': {
              color: '#FCA5A5'
            }
          }}
        >
          {errorMessage}
        </Alert>
      </Collapse>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2.5}
        sx={{ '@media (max-height: 750px)': { mb: 2 } }}
      >
        <StyledFormControlLabel
          control={
            <Checkbox
              name="remember"
              checked={formData.remember}
              onChange={onInputChange}
              disabled={isLoading}
            />
          }
          label="Recordarme"
        />
        <StyledLink href="#" variant="body2">
          Olvidaste tu contraseña?
        </StyledLink>
      </Box>

      <LoginButton
        fullWidth
        variant="contained"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress 
            size={24} 
            thickness={4}
            sx={{ color: 'primary.contrastText' }} 
          />
        ) : (
          'Iniciar Sesion'
        )}
      </LoginButton>
    </Box>
  );
};