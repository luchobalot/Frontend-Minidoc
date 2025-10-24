// src/components/layout/AppBar/data/mockNotifications.js

export const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Usuario creado exitosamente',
    message: 'El usuario "Juan Perez" ha sido registrado en el sistema.',
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 2,
    type: 'warning',
    title: 'Actualizacion pendiente',
    message: 'Hay 3 usuarios con datos incompletos que requieren atencion.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 3,
    type: 'info',
    title: 'Mantenimiento programado',
    message: 'El sistema estara en mantenimiento el sabado de 02:00 a 06:00.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 4,
    type: 'error',
    title: 'Error en sincronizacion',
    message: 'No se pudo sincronizar con el servidor principal.',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
  },
];