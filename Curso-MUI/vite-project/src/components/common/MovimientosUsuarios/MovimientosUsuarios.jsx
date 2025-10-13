// src/components/common/MovimientosUsuarios/MovimientosUsuarios.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  alpha,
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  Avatar,
  Tooltip,
  IconButton,
  TableSortLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: '#0F172A',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: alpha('#3B82F6', 0.1),
  borderRadius: 24,
  maxWidth: '1400px',
  mx: 'auto',
  width: '100%',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  background: 'rgba(30, 58, 138, 0.15)',
  borderBottom: '1px solid',
  borderColor: alpha('#3B82F6', 0.1),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  background: 'rgba(30, 58, 138, 0.08)',
  borderBottom: '1px solid',
  borderColor: alpha('#3B82F6', 0.1),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha('#1E3A8A', 0.15),
  },
  transition: 'background-color 0.2s ease',
}));

const ActionIconWrapper = styled(Box)(({ actionType }) => {
  const colors = {
    create: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981' },
    edit: { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' },
    delete: { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' },
    permission: { bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' },
  };

  return {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors[actionType]?.bg || colors.edit.bg,
    color: colors[actionType]?.color || colors.edit.color,
    flexShrink: 0,
  };
});

const getActionIcon = (actionType) => {
  switch (actionType) {
    case 'create':
      return <PersonAddIcon fontSize="small" />;
    case 'edit':
      return <EditIcon fontSize="small" />;
    case 'delete':
      return <DeleteIcon fontSize="small" />;
    case 'permission':
      return <SecurityIcon fontSize="small" />;
    default:
      return <HistoryIcon fontSize="small" />;
  }
};

const getActionLabel = (actionType) => {
  const labels = {
    create: 'Creacion',
    edit: 'Modificacion',
    delete: 'Eliminacion',
    permission: 'Permisos',
  };
  return labels[actionType] || 'Accion';
};

const getActionColor = (actionType) => {
  const colors = {
    create: 'success',
    edit: 'warning',
    delete: 'error',
    permission: 'secondary',
  };
  return colors[actionType] || 'default';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  
  const isToday = date.toDateString() === today.toDateString();
  
  if (isToday) {
    return `Hoy, ${date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    })}`;
  }
  
  return date.toLocaleDateString('es-AR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric'
  });
};

export default function MovimientosUsuarios() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('fecha');
  const [order, setOrder] = useState('desc');
  const [filterAction, setFilterAction] = useState('all');

  // Datos hardcodeados de movimientos
  const movimientosBase = [
    {
      id: 1,
      accion: 'create',
      usuarioAfectado: { nombre: 'Juan', apellido: 'Perez', matricula: '0012345' },
      usuarioResponsable: { nombre: 'Luciano', apellido: 'Balot', matricula: '0098765' },
      fecha: new Date().toISOString(),
      descripcion: 'Se creo un nuevo usuario en el sistema',
    },
    {
      id: 2,
      accion: 'edit',
      usuarioAfectado: { nombre: 'Martin', apellido: 'Gomez', matricula: '0056789' },
      usuarioResponsable: { nombre: 'Luciano', apellido: 'Balot', matricula: '0098765' },
      fecha: new Date(Date.now() - 86400000).toISOString(),
      descripcion: 'Se modifico la informacion del usuario',
    },
    {
      id: 3,
      accion: 'permission',
      usuarioAfectado: { nombre: 'Camila', apellido: 'Perez', matricula: '0025678' },
      usuarioResponsable: { nombre: 'Diego', apellido: 'Martinez', matricula: '0078905' },
      fecha: new Date(Date.now() - 172800000).toISOString(),
      descripcion: 'Se otorgaron permisos especiales',
    },
    {
      id: 4,
      accion: 'delete',
      usuarioAfectado: { nombre: 'Carlos', apellido: 'Rodriguez', matricula: '0034521' },
      usuarioResponsable: { nombre: 'Luciano', apellido: 'Balot', matricula: '0098765' },
      fecha: new Date(Date.now() - 259200000).toISOString(),
      descripcion: 'Usuario eliminado del sistema',
    },
    {
      id: 5,
      accion: 'create',
      usuarioAfectado: { nombre: 'Sofia', apellido: 'Morales', matricula: '0091234' },
      usuarioResponsable: { nombre: 'Diego', apellido: 'Martinez', matricula: '0078905' },
      fecha: new Date(Date.now() - 345600000).toISOString(),
      descripcion: 'Nuevo usuario registrado en el sistema',
    },
    {
      id: 6,
      accion: 'permission',
      usuarioAfectado: { nombre: 'Federico', apellido: 'Lopez', matricula: '0045678' },
      usuarioResponsable: { nombre: 'Luciano', apellido: 'Balot', matricula: '0098765' },
      fecha: new Date(Date.now() - 432000000).toISOString(),
      descripcion: 'Modificacion de permisos de seguridad',
    },
    {
      id: 7,
      accion: 'edit',
      usuarioAfectado: { nombre: 'Pablo', apellido: 'Gutierrez', matricula: '0089012' },
      usuarioResponsable: { nombre: 'Ana', apellido: 'Silva', matricula: '0045123' },
      fecha: new Date(Date.now() - 518400000).toISOString(),
      descripcion: 'Actualizacion de datos del usuario',
    },
    {
      id: 8,
      accion: 'delete',
      usuarioAfectado: { nombre: 'Laura', apellido: 'Torres', matricula: '0023456' },
      usuarioResponsable: { nombre: 'Diego', apellido: 'Martinez', matricula: '0078905' },
      fecha: new Date(Date.now() - 604800000).toISOString(),
      descripcion: 'Usuario dado de baja del sistema',
    },
  ];

  const handleSearch = () => setPage(1);
  const handleClearSearch = () => { setSearchQuery(''); setPage(1); };
  const handleChangePage = (_e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => { 
    setRowsPerPage(parseInt(e.target.value, 10)); 
    setPage(1); 
  };
  
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Filtrado
  let filteredMovimientos = movimientosBase.filter((m) => {
    const matchesSearch = !searchQuery || 
      m.usuarioAfectado.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.usuarioAfectado.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.usuarioResponsable.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.usuarioResponsable.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterAction === 'all' || m.accion === filterAction;

    return matchesSearch && matchesFilter;
  });

  // Ordenamiento
  const sortedMovimientos = [...filteredMovimientos].sort((a, b) => {
    let aValue, bValue;
    
    if (orderBy === 'fecha') {
      aValue = new Date(a.fecha);
      bValue = new Date(b.fecha);
    } else if (orderBy === 'usuarioAfectado') {
      aValue = a.usuarioAfectado.apellido.toLowerCase();
      bValue = b.usuarioAfectado.apellido.toLowerCase();
    } else if (orderBy === 'accion') {
      aValue = a.accion;
      bValue = b.accion;
    }

    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  });

  const totalPages = Math.ceil(sortedMovimientos.length / rowsPerPage);
  const paginatedMovimientos = sortedMovimientos.slice(
    (page - 1) * rowsPerPage, 
    page * rowsPerPage
  );

  return (
    <StyledPaper elevation={0}>
      {/* Filtros */}
      <FilterBox>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
          <TextField
            fullWidth
            placeholder="Buscar por usuario, responsable o descripcion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 42,
                backgroundColor: alpha('#1E3A8A', 0.3),
                '& fieldset': { borderColor: alpha('#3B82F6', 0.2) },
                '&:hover fieldset': { borderColor: alpha('#3B82F6', 0.4) },
                '&.Mui-focused fieldset': { borderColor: '#3B82F6' },
              },
              '& .MuiInputBase-input': { color: 'text.primary', fontSize: '0.9rem' },
            }}
          />

          <FormControl 
            size="small" 
            sx={{ 
              minWidth: 180,
              '& .MuiOutlinedInput-root': {
                height: 42,
                backgroundColor: alpha('#1E3A8A', 0.3),
                color: 'text.primary',
                '& fieldset': { borderColor: alpha('#3B82F6', 0.2) },
                '&:hover fieldset': { borderColor: alpha('#3B82F6', 0.4) },
                '&.Mui-focused fieldset': { borderColor: '#3B82F6' },
              },
            }}
          >
            <Select
              value={filterAction}
              onChange={(e) => { setFilterAction(e.target.value); setPage(1); }}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              }
            >
              <MenuItem value="all">Todas las acciones</MenuItem>
              <MenuItem value="create">Creaciones</MenuItem>
              <MenuItem value="edit">Modificaciones</MenuItem>
              <MenuItem value="delete">Eliminaciones</MenuItem>
              <MenuItem value="permission">Permisos</MenuItem>
            </Select>
          </FormControl>

          {(searchQuery || filterAction !== 'all') && (
            <Tooltip title="Limpiar filtros">
              <IconButton
                onClick={() => {
                  handleClearSearch();
                  setFilterAction('all');
                }}
                sx={{
                  color: '#ffffffff',
                  backgroundColor: alpha('#402fb0ff', 0.1),
                  '&:hover': { backgroundColor: alpha('#b09affff', 0.2) },
                }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </FilterBox>

      {/* Tabla */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: alpha('#000', 0.3),
                '& th': { py: 1.5, px: 2, fontSize: '0.875rem' },
              }}
            >
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '12%' }}>
                <TableSortLabel
                  active={orderBy === 'accion'}
                  direction={orderBy === 'accion' ? order : 'asc'}
                  onClick={() => handleRequestSort('accion')}
                  sx={{ 
                    color: 'text.primary !important',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: '#3B82F6 !important' } 
                  }}
                >
                  Accion
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '20%' }}>
                <TableSortLabel
                  active={orderBy === 'usuarioAfectado'}
                  direction={orderBy === 'usuarioAfectado' ? order : 'asc'}
                  onClick={() => handleRequestSort('usuarioAfectado')}
                  sx={{ 
                    color: 'text.primary !important',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: '#3B82F6 !important' } 
                  }}
                >
                  Usuario Afectado
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '35%' }}>
                Descripcion
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '18%' }}>
                Responsable
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '15%' }}>
                <TableSortLabel
                  active={orderBy === 'fecha'}
                  direction={orderBy === 'fecha' ? order : 'asc'}
                  onClick={() => handleRequestSort('fecha')}
                  sx={{ 
                    color: 'text.primary !important',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: '#3B82F6 !important' } 
                  }}
                >
                  Fecha
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedMovimientos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No se encontraron movimientos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery || filterAction !== 'all' 
                      ? 'Intenta con otros criterios de busqueda' 
                      : 'No hay registros de auditoria disponibles'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedMovimientos.map((movimiento) => (
                <StyledTableRow key={movimiento.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ActionIconWrapper actionType={movimiento.accion}>
                        {getActionIcon(movimiento.accion)}
                      </ActionIconWrapper>
                      <Chip
                        label={getActionLabel(movimiento.accion)}
                        size="small"
                        color={getActionColor(movimiento.accion)}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: alpha('#3B82F6', 0.2),
                          color: '#3B82F6',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {movimiento.usuarioAfectado.nombre[0]}
                        {movimiento.usuarioAfectado.apellido[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ color: 'text.primary' }}>
                          {movimiento.usuarioAfectado.apellido}, {movimiento.usuarioAfectado.nombre}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                            fontSize: '0.7rem'
                          }}
                        >
                          MR: {movimiento.usuarioAfectado.matricula}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {movimiento.descripcion}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: alpha('#10B981', 0.2),
                          color: '#10B981',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                        }}
                      >
                        {movimiento.usuarioResponsable.nombre[0]}
                        {movimiento.usuarioResponsable.apellido[0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        {movimiento.usuarioResponsable.apellido}, {movimiento.usuarioResponsable.nombre[0]}.
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                      {formatDate(movimiento.fecha)}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginacion */}
      {sortedMovimientos.length > 0 && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            borderTop: '1px solid',
            borderColor: alpha('#3B82F6', 0.1),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Filas por pagina:
            </Typography>
            <FormControl size="small">
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                sx={{
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: alpha('#3B82F6', 0.2) },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: alpha('#3B82F6', 0.4) },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3B82F6' },
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'text.secondary',
                borderColor: alpha('#3B82F6', 0.2),
                '&:hover': { backgroundColor: alpha('#3B82F6', 0.1) },
                '&.Mui-selected': {
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#2563EB' },
                },
              },
            }}
          />

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, sortedMovimientos.length)} de ${sortedMovimientos.length}`}
          </Typography>
        </Box>
      )}
    </StyledPaper>
  );
}