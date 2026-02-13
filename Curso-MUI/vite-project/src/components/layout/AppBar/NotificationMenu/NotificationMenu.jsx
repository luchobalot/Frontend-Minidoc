import React from 'react';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Badge,
  Grow,
  Button
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { useNotificationMenu } from './useNotificationMenu';
import {
  StyledMenuLayout,
  NotificationHeader,
  NotificationList,
  NotificationItem,
  NotificationContent,
  NotificationTime,
  EmptyStateContainer
} from './NotificationMenu.styles';

export default function NotificationMenu() {
  const {
    anchorEl,
    open,
    handleOpen,
    handleClose,
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleClearAll
  } = useNotificationMenu();

  return (
    <>
      <Tooltip title="Notificaciones">
        <IconButton
          onClick={handleOpen}
          sx={{
            color: open ? 'primary.main' : 'text.secondary',
            p: 1, // Ajustado para coincidir visualmente si es necesario
            borderRadius: 2,
            border: '1px solid',
            borderColor: open ? 'primary.main' : 'transparent',
            backgroundColor: open ? alpha('#3B82F6', 0.04) : 'transparent',
            transition: 'all 0.2s ease',
            "&:hover": {
              backgroundColor: alpha('#3B82F6', 0.06),
              borderColor: alpha('#3B82F6', 0.3),
              color: 'primary.main',
            },
          }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon fontSize="medium" />
          </Badge>
        </IconButton>
      </Tooltip>

      <StyledMenuLayout
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        transitionDuration={200}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <NotificationHeader>
          <Typography variant="h6" fontSize="1rem" fontWeight={600}>
            Notificaciones
          </Typography>
          {notifications.length > 0 && (
            <Button 
              size="small" 
              onClick={handleClearAll}
              sx={{ fontSize: '0.75rem', textTransform: 'none' }}
            >
              Marcar todo leído
            </Button>
          )}
        </NotificationHeader>

        <NotificationList>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem 
                key={notification.id} 
                onClick={() => handleMarkAsRead(notification.id)}
                unread={notification.unread ? 1 : 0}
              >
                <NotificationContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography 
                      variant="subtitle2" 
                      fontWeight={notification.unread ? 700 : 500}
                      color="text.primary"
                    >
                      {notification.title}
                    </Typography>
                    {notification.unread && (
                      <CircleIcon sx={{ fontSize: 10, color: 'primary.main', mt: 0.5 }} />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" fontSize="0.85rem">
                    {notification.description}
                  </Typography>
                  <NotificationTime variant="caption">
                    {notification.time}
                  </NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))
          ) : (
            <EmptyStateContainer>
              <NotificationsNoneIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
              <Typography variant="body2">
                No tienes notificaciones
              </Typography>
            </EmptyStateContainer>
          )}
        </NotificationList>
      </StyledMenuLayout>
    </>
  );
}
