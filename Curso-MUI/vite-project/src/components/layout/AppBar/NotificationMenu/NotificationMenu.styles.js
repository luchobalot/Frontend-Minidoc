import { styled, alpha } from '@mui/material/styles';
import { Menu, MenuItem, Box, Typography } from '@mui/material';

// Based on StyledMenuLayout from UserMenu.styles.js
export const StyledMenuLayout = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(2.5),
        padding: 0,
        borderRadius: theme.spacing(2),
        minWidth: 360, // Slightly wider for notifications
        maxWidth: 400,
        background: '#FFFFFF',
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.5),
        boxShadow: `
      0 4px 6px -1px rgba(0, 0, 0, 0.08),
      0 2px 4px -2px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.02)
    `,
        overflow: 'visible',

        // Arrow pointing up
        '&::before': {
            content: '""',
            position: 'absolute',
            top: -8,
            right: 20,
            width: 16,
            height: 16,
            backgroundColor: '#FFFFFF',
            border: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.5),
            borderBottom: 'none',
            borderRight: 'none',
            transform: 'rotate(45deg)',
            zIndex: 0,
        },
    },
    '& .MuiList-root': {
        padding: 0,
    },
}));

export const NotificationHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const NotificationList = styled(Box)(({ theme }) => ({
    maxHeight: 400,
    overflowY: 'auto',
}));

export const NotificationItem = styled(MenuItem)(({ theme, unread }) => ({
    whiteSpace: 'normal', // Allow text wrapping
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
    backgroundColor: unread ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: unread
            ? alpha(theme.palette.primary.main, 0.08)
            : alpha(theme.palette.action.hover, 0.04),
    },

    '&:last-child': {
        borderBottom: 'none',
    },
}));

export const NotificationContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
});

export const NotificationTime = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
}));

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
}));
