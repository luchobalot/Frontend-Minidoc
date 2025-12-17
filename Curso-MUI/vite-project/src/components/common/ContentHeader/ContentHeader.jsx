import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Breadcrumbs,
  Link,
  Tooltip,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

export default function ContentHeader({
  title,
  description,
  actions = [],
  breadcrumbs = [],
  children,
}) {
  return (
    <Box
      sx={{
        maxWidth: '1400px',
        mx: 'auto',
        mb: 3,
      }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Box sx={{ px: 3, pt: 2, pb: 0 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 16, color: '#D1D5DB' }} />}
            sx={{
              '& .MuiBreadcrumbs-separator': {
                mx: 0.5,
              },
            }}
          >
            <Link
              href="/inicio"
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: '#6B7280',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#3B82F6',
                },
              }}
            >
              <HomeIcon sx={{ fontSize: 16 }} />
              Inicio
            </Link>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return isLast ? (
                <Typography
                  key={index}
                  sx={{
                    color: '#111827',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {crumb.label}
                </Typography>
              ) : (
                <Link
                  key={index}
                  href={crumb.href}
                  underline="hover"
                  sx={{
                    color: '#6B7280',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#3B82F6',
                    },
                  }}
                >
                  {crumb.label}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Box>
      )}

      {/* Header Principal */}
      <Box
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* Seccion Izquierda: Titulo + descripcion */}
        <Box sx={{ flex: 1, minWidth: '240px' }}>
          <Typography
            variant="h5"
            sx={{
              color: '#111827',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: '1.5rem',
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                mt: 0.5,
                fontSize: '0.875rem',
              }}
            >
              {description}
            </Typography>
          )}

          {children && <Box mt={1.5}>{children}</Box>}
        </Box>

        {/* Seccion Derecha: Botones */}
        {actions.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            {actions.map((action, index) => {
              const button = (
                <Button
                  key={action.id || index}
                  variant={action.variant || 'contained'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  // Si hay label, usamos startIcon. Si no, el ícono es el hijo.
                  startIcon={action.label ? action.icon : null}
                  sx={{
                    // Estilos para botones de solo ícono (IconButton)
                    minWidth: action.label ? 'auto' : 36,
                    width: action.label ? 'auto' : 36,
                    px: action.label ? 2.5 : 0, // Padding horizontal 0 para centrar ícono
                    // Estilos base
                    height: 36,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    background:
                      action.variant === 'outlined'
                        ? 'transparent'
                        : action.color === 'success'
                        ? '#10B981'
                        : action.color === 'error'
                        ? '#EF4444'
                        : '#3B82F6',
                    border:
                      action.variant === 'outlined'
                        ? '1.5px solid #D1D5DB'
                        : 'none',
                    color:
                      action.variant === 'outlined' ? '#6B7280' : '#FFFFFF',
                    boxShadow: 'none',
                    '&:hover': {
                      background:
                        action.variant === 'outlined'
                          ? '#F9FAFB'
                          : action.color === 'success'
                          ? '#059669'
                          : action.color === 'error'
                          ? '#DC2626'
                          : '#2563EB',
                      borderColor:
                        action.variant === 'outlined' ? '#9CA3AF' : undefined,
                      boxShadow:
                        action.variant !== 'outlined'
                          ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                          : 'none',
                    },
                    '&:disabled': {
                      backgroundColor: '#F3F4F6',
                      color: '#9CA3AF',
                    },
                  }}
                >
                  {action.label || action.icon}
                </Button>
              );

              // Si la acción tiene un tooltip, envolvemos el botón
              return action.tooltip ? (
                <Tooltip key={action.id || index} title={action.tooltip} arrow>
                  {/* El span es necesario para que el Tooltip funcione en botones deshabilitados */}
                  <span>{button}</span>
                </Tooltip>
              ) : (
                button
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
}