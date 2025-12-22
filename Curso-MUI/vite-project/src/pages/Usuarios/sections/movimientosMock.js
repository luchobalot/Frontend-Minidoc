import { usuariosMock } from '../../../components/tables/UsuariosTable/usuariosMock';

const getUsuarioMock = (id) => {
    const user = usuariosMock.find(u => u.id === id);
    return user ? user : usuariosMock[0]; 
};

export const movimientosMock = [
  {
    id: 1,
    accion: 'CREACION',
    usuarioModificador: `${getUsuarioMock(1).nombre} ${getUsuarioMock(1).apellido}`, 
    usuarioAfectado: `${getUsuarioMock(5).nombre} ${getUsuarioMock(5).apellido}`, 
    fecha: '2025-12-09T10:00:00',
    detalle: 'Alta de nuevo usuario en el sistema.',
    cambios: [
      { campo: 'Nombre', anterior: '-', nuevo: 'Ana' },
      { campo: 'Apellido', anterior: '-', nuevo: 'LÓPEZ' },
      { campo: 'Destino', anterior: '-', nuevo: 'HNPB' },
      { campo: 'Nivel', anterior: '-', nuevo: 'Operador' },
    ]
  },
  {
    id: 2,
    accion: 'MODIFICACION',
    usuarioModificador: `${getUsuarioMock(2).nombre} ${getUsuarioMock(2).apellido}`, 
    usuarioAfectado: `${getUsuarioMock(1).nombre} ${getUsuarioMock(1).apellido}`, 
    fecha: '2025-12-09T11:15:30',
    detalle: 'Elevación de privilegios y cambio de clasificación.',
    cambios: [
      { campo: 'Clasificación', anterior: 'Reservado', nuevo: 'Confidencial' },
      { campo: 'Nivel', anterior: 'Usuario', nuevo: 'Administrador' }
    ]
  },
  {
    id: 3,
    accion: 'ELIMINACION',
    usuarioModificador: `${getUsuarioMock(3).nombre} ${getUsuarioMock(3).apellido}`, 
    usuarioAfectado: `${getUsuarioMock(7).nombre} ${getUsuarioMock(7).apellido}`, 
    fecha: '2025-12-09T14:45:10',
    detalle: 'Baja lógica por inactividad prolongada.',
    cambios: [
      { campo: 'Estado', anterior: 'Activo', nuevo: 'Inactivo / Eliminado' }
    ]
  },
  {
    id: 4,
    accion: 'CREACION',
    usuarioModificador: `${getUsuarioMock(1).nombre} ${getUsuarioMock(1).apellido}`, 
    usuarioAfectado: `${getUsuarioMock(2).nombre} ${getUsuarioMock(2).apellido}`, 
    fecha: '2025-12-08T09:30:00',
    detalle: 'Ingreso inicial desde módulo de enrolamiento.',
    cambios: [
       { campo: 'Logon', anterior: '-', nuevo: 'juancito_perez' },
       { campo: 'Jerarquía', anterior: '-', nuevo: 'Cabo Segundo' }
    ]
  },
  {
    id: 5,
    accion: 'MODIFICACION',
    usuarioModificador: `${getUsuarioMock(5).nombre} ${getUsuarioMock(5).apellido}`, 
    usuarioAfectado: `${getUsuarioMock(3).nombre} ${getUsuarioMock(3).apellido}`, 
    fecha: '2025-12-08T16:20:00',
    detalle: 'Restablecimiento de credenciales de acceso.',
    cambios: [
      { campo: 'Contraseña', anterior: '********', nuevo: '******** (Reset)' },
      { campo: 'Intentos Fallidos', anterior: '3', nuevo: '0' }
    ]
  },
  {
    id: 6,
    accion: 'MODIFICACION',
    usuarioModificador: `${getUsuarioMock(4).nombre} ${getUsuarioMock(4).apellido}`, 
    usuarioAfectado: `${getUsuarioMock(6).nombre} ${getUsuarioMock(6).apellido}`, 
    fecha: '2025-12-07T10:00:00',
    detalle: 'Traslado de destino operativo.',
    cambios: [
      { campo: 'Destino', anterior: 'SIAG', nuevo: 'HNPB' }
    ]
  },
  {
    id: 7,
    accion: 'CREACION',
    usuarioModificador: `${getUsuarioMock(8).nombre} ${getUsuarioMock(8).apellido}`, 
    usuarioAfectado: `${getUsuarioMock(9).nombre} ${getUsuarioMock(9).apellido}`, 
    fecha: '2025-12-06T15:00:00',
    detalle: 'Alta manual de operador.',
    cambios: [
      { campo: 'Rol', anterior: '-', nuevo: 'Operador' }
    ]
  },
];