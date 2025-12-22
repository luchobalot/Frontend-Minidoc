// src/pages/MiPerfil/MiPerfil.styles.js
import { styled, alpha } from '@mui/material/styles';
import { Paper, Box, Typography, Chip, Avatar } from '@mui/material';

export const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1400,
  margin: '0 auto',
}));

export const ProfileHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  fontSize: '2rem',
  fontWeight: 700,
  background: 'rgba(255, 255, 255, 0.25)',
  border: '3px solid rgba(255, 255, 255, 0.4)',
  color: '#FFFFFF',
  flexShrink: 0,
}));

export const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const InfoRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& svg': {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
}));

export const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  lineHeight: 1.6,
}));

export const StatusChip = styled(Chip)(({ theme, color }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 28,
  borderRadius: 14,
  backgroundColor: alpha(theme.palette[color].main, 0.1),
  color: theme.palette[color].main,
  border: `1.5px solid ${alpha(theme.palette[color].main, 0.3)}`,
  '& .MuiChip-icon': {
    marginLeft: theme.spacing(1),
    fontSize: '0.9rem',
    color: 'inherit',
  },
}));