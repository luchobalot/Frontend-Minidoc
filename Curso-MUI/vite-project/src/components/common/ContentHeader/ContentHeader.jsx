import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  alpha,
} from '@mui/material';

export default function ContentHeader({
  title,
  description,
  actions = [],
  children,
}) {
  return (
    <Box
      sx={{
        maxWidth: '88%',
        mx: 'auto',
        mb: 3,
        py: 2.5,
        px: 3,
        background: '#0F172A', // mismo fondo que la tabla
        border: '1px solid',
        borderColor: alpha('#3B82F6', 0.1),
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* SecciÃ³n Izquierda: TÃ­tulo + descripciÃ³n */}
      <Box sx={{ flex: 1, minWidth: '240px' }}>
        <Typography
          variant="h6"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              mt: 0.3,
              fontSize: '0.875rem',
            }}
          >
            {description}
          </Typography>
        )}

        {children && <Box mt={1.5}>{children}</Box>}
      </Box>

      {/* SecciÃ³n Derecha: Botones */}
      {actions.length > 0 && (
        <Stack
          direction="row"
          spacing={1.2}
          flexWrap="wrap"
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          {actions.map((action, index) => (
            <Button
              key={action.id || index}
              variant={action.variant || 'contained'}
              onClick={action.onClick}
              disabled={action.disabled}
              startIcon={action.icon || null}
              sx={{
                height: 38,
                px: 2.5,
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                background:
                  action.variant === 'outlined'
                    ? 'transparent'
                    : action.color === 'success'
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                border:
                  action.variant === 'outlined'
                    ? `1px solid ${alpha('#3B82F6', 0.4)}`
                    : 'none',
                color:
                  action.variant === 'outlined'
                    ? '#93C5FD'
                    : '#FFFFFF',
                '&:hover': {
                  background:
                    action.variant === 'outlined'
                      ? alpha('#3B82F6', 0.1)
                      : action.color === 'success'
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                      : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  borderColor: alpha('#3B82F6', 0.6),
                },
              }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      )}
    </Box>
  );
}