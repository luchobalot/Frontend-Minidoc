// src/components/common/NotificationsMenu/NotificationsMenu.jsx
import React from 'react';
import {
  Menu,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';

const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
}));

const NotificationItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  cursor: 'pointer',
  backgroundColor: 'rgba(59, 130, 246, 0.05)',
  borderLeft: '3px solid #3B82F6',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    '& .mark-as-read-btn': {
      opacity: 1,
    },
  },
  '&:not(:last-child)': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
}));

const NotificationIconWrapper = styled(Box)(({ type }) => {
  const colors = {
    success: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981' },
    warning: { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
    info: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' },
    error: { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' },
  };

  return {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors[type]?.bg || colors.info.bg,
    color: colors[type]?.color || colors.info.color,
    flexShrink: 0,
  };
});

const EmptyNotifications = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.5)',
}));

const MarkAsReadButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  opacity: 0,
  transition: 'opacity 0.2s ease',
  width: 28,
  height: 28,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#3B82F6',
  },
}));

const getNotificationIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon fontSize="small" />;
    case 'warning':
      return <WarningIcon fontSize="small" />;
    case 'error':
      return <ErrorIcon fontSize="small" />;
    default:
      return <InfoIcon fontSize="small" />;
  }
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Hace un momento';
  if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} h`;
  if (seconds < 604800) return `Hace ${Math.floor(seconds / 86400)} d`;
  return date.toLocaleDateString();
};

export default function NotificationsMenu({ 
  anchorEl, 
  open, 
  onClose, 
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
}) {
  const handleNotificationClick = (notification, event) => {
    // Evitar que el click en el boton de cerrar active este handler
    if (event.target.closest('.mark-as-read-btn')) {
      return;
    }
    console.log('Notification clicked:', notification);
    // Aqui podrias navegar a una pagina especifica o mostrar mas detalles
  };

  const handleMarkAsRead = (notificationId, event) => {
    event.stopPropagation(); // Evitar que se active el click del item
    if (onMarkAsRead) {
      onMarkAsRead(notificationId);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  // Solo mostrar las primeras 3 notificaciones no leidas
  const displayNotifications = notifications.slice(0, 3);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Fade}
      transitionDuration={200}
      PaperProps={{
        sx: {
          mt: 1,
          borderRadius: 2,
          width: 380,
          maxWidth: '90vw',
          background: 'rgba(8, 17, 40, 0.96)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          maxHeight: '500px',
        },
      }}
    >
      {/* Header */}
      <NotificationHeader>
        <Typography variant="body1" fontWeight={700} fontSize="0.95rem">
          Notificaciones
        </Typography>
        {displayNotifications.length > 0 && (
          <Button
            size="small"
            onClick={handleMarkAllAsRead}
            sx={{
              fontSize: '0.75rem',
              textTransform: 'none',
              color: '#3B82F6',
              minWidth: 'auto',
              padding: '4px 8px',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              },
            }}
          >
            Marcar todas como leidas
          </Button>
        )}
      </NotificationHeader>

      {/* Notifications List */}
      <Box sx={{ maxHeight: '360px', overflowY: 'auto' }}>
        {displayNotifications.length === 0 ? (
          <EmptyNotifications>
            <NotificationsIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              No tienes notificaciones nuevas
            </Typography>
          </EmptyNotifications>
        ) : (
          displayNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              onClick={(e) => handleNotificationClick(notification, e)}
            >
              <MarkAsReadButton
                className="mark-as-read-btn"
                size="small"
                onClick={(e) => handleMarkAsRead(notification.id, e)}
                title="Marcar como leida"
              >
                <CloseIcon fontSize="small" sx={{ fontSize: 16 }} />
              </MarkAsReadButton>

              <Stack direction="row" spacing={1.5} sx={{ pr: 4 }}>
                <NotificationIconWrapper type={notification.type}>
                  {getNotificationIcon(notification.type)}
                </NotificationIconWrapper>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      color: '#FFFFFF',
                      fontSize: '0.875rem',
                      mb: 0.3,
                    }}
                  >
                    {notification.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.8rem',
                      mb: 0.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.75rem',
                    }}
                  >
                    {formatTimeAgo(notification.timestamp)}
                  </Typography>
                </Box>
              </Stack>
            </NotificationItem>
          ))
        )}
      </Box>

      {/* Footer */}
      {displayNotifications.length > 0 && (
        <>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
          <Box sx={{ p: 1.5, textAlign: 'center' }}>
            <Button
              fullWidth
              variant="text"
              onClick={() => {
                console.log('Ver todas las notificaciones');
                onClose();
                // Aqui navegarias a la pagina completa de notificaciones
              }}
              sx={{
                color: '#3B82F6',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
              }}
            >
              Ver todas las notificaciones
            </Button>
          </Box>
        </>
      )}
    </Menu>
  );
}