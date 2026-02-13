import { useState } from 'react';

export const useNotificationMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Mock data for notifications
    const notifications = [
        {
            id: 1,
            title: 'Nuevo mensaje recibido',
            description: 'Juan Pérez ha enviado un nuevo mensaje en el proyecto Alpha.',
            time: 'Hace 5 min',
            unread: true,
            type: 'message'
        },
        {
            id: 2,
            title: 'Tarea completada',
            description: 'La tarea "Revisión de diseño" ha sido marcada como completada.',
            time: 'Hace 1 hora',
            unread: true,
            type: 'task'
        },
        {
            id: 3,
            title: 'Bienvenido al sistema',
            description: 'Gracias por registrarte en nuestra plataforma.',
            time: 'Hace 2 días',
            unread: false,
            type: 'system'
        }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleMarkAsRead = (id) => {
        console.log(`Marking notification ${id} as read`);
        // Logic to mark as read would go here
    };

    const handleClearAll = () => {
        console.log('Clearing all notifications');
        // Logic to clear all would go here
    };

    return {
        anchorEl,
        open,
        handleOpen,
        handleClose,
        notifications,
        unreadCount,
        handleMarkAsRead,
        handleClearAll
    };
};
