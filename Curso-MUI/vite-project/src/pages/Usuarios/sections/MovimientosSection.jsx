import React, { useState, useMemo } from 'react';
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
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  TableSortLabel,
  CircularProgress,
  Collapse,
} from '@mui/material';

import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

import ContentHeader from '../../../components/common/ContentHeader/ContentHeader';
import { movimientosMock } from './movimientosMock';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

// Configuración visual de los Chips de Acción
const getActionConfig = (action) => {
  switch (action) {
    case 'CREACION':
      return { label: 'CREACIÓN', bgColor: '#DCFCE7', color: '#166534', borderColor: '#86EFAC' };
    case 'MODIFICACION':
      return { label: 'MODIFICACIÓN', bgColor: '#FEF3C7', color: '#B45309', borderColor: '#FCD34D' };
    case 'ELIMINACION':
      return { label: 'ELIMINACIÓN', bgColor: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5' };
    default:
      return { label: action, bgColor: '#F3F4F6', color: '#374151', borderColor: '#E5E7EB' };
  }
};

// --- SUB-COMPONENTE: FILA EXPANDIBLE (Row) ---
function Row({ row, dense }) {
  const [open, setOpen] = useState(false);
  const actionConfig = getActionConfig(row.accion);

  return (
    <React.Fragment>
      {/* Fila Principal */}
      <TableRow
        onClick={() => setOpen(!open)} // Permite expandir clicando en cualquier lado
        sx={{
          cursor: 'pointer',
          '& > *': { borderBottom: 'unset' },
          backgroundColor: open ? '#F3F4F6' : 'inherit', // Resaltado activo
          transition: 'background-color 0.2s ease',
          '&:hover': { backgroundColor: '#F3F4F6' },
        }}
      >
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expandir fila"
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Evitar doble evento si se clica el botón
              setOpen(!open);
            }}
            sx={{ 
                color: open ? 'primary.main' : 'text.secondary',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </TableCell>

        <TableCell>
          <Chip
            label={actionConfig.label}
            size="small"
            sx={{
              height: dense ? 20 : 24,
              fontSize: '0.7rem',
              backgroundColor: actionConfig.bgColor,
              color: actionConfig.color,
              fontWeight: 700,
              border: '1px solid',
              borderColor: actionConfig.borderColor,
              minWidth: 100,
            }}
          />
        </TableCell>
        <TableCell>
            <Typography variant="body2" fontWeight={600} sx={{ color: 'text.primary', fontSize: dense ? '0.8125rem' : '0.875rem' }}>
                {row.usuarioModificador}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: dense ? '0.8125rem' : '0.875rem' }}>
                {row.usuarioAfectado}
            </Typography>
        </TableCell>
        <TableCell>
            <Box>
                <Typography variant="body2" sx={{ color: 'text.primary', fontSize: dense ? '0.8125rem' : '0.875rem', fontWeight: 500 }}>
                    {moment(row.fecha).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    {moment(row.fecha).format('HH:mm:ss')}
                </Typography>
            </Box>
        </TableCell>
        <TableCell>
             <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: dense ? '0.8125rem' : '0.875rem', fontStyle: 'italic' }}>
                {row.detalle}
            </Typography>
        </TableCell>
      </TableRow>

      {/* Fila Expandida (Detalle) */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* Contenedor del Detalle: Fondo gris sutil y sombra interna para profundidad */}
            <Box 
                sx={{ 
                    bgcolor: '#F8FAFC', 
                    py: 3, 
                    px: { xs: 2, md: 8 }, // Indentación para alinearse visualmente
                    borderBottom: '1px solid #E5E7EB',
                    boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' 
                }}
            >
              <Typography 
                variant="overline" 
                component="div" 
                sx={{ 
                    fontWeight: 700, 
                    color: '#64748B', 
                    mb: 1.5,
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem'
                }}
              >
                DESGLOSE DE CAMBIOS
              </Typography>
              
              {row.cambios && row.cambios.length > 0 ? (
                // Tabla "Flotante" limpia (sin bordes externos pesados)
                <Table 
                    size="small" 
                    sx={{ 
                        bgcolor: 'white', 
                        border: '1px solid #E2E8F0', 
                        borderRadius: 2,
                        overflow: 'hidden', // Para respetar el border radius
                        '& .MuiTableCell-root': { borderBottom: '1px solid #F1F5F9' }
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#F1F5F9' }}>
                            <TableCell sx={{ color: '#475569', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', py: 1.5 }}>Propiedad / Campo</TableCell>
                            <TableCell sx={{ color: '#EF4444', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', py: 1.5 }}>Valor Anterior</TableCell>
                            <TableCell width={40} align="center"></TableCell> {/* Flecha conectora */}
                            <TableCell sx={{ color: '#10B981', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', py: 1.5 }}>Valor Nuevo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.cambios.map((cambio, index) => (
                            <TableRow key={index} hover>
                                <TableCell sx={{ fontWeight: 600, color: '#334155', fontSize: '0.8125rem', width: '25%' }}>
                                    {cambio.campo}
                                </TableCell>
                                
                                {/* Valor Anterior (Estilo Diff Eliminado/Rojo) */}
                                <TableCell sx={{ width: '35%' }}>
                                    <Box sx={{ 
                                        bgcolor: '#FEF2F2', 
                                        color: '#B91C1C', 
                                        py: 0.5, px: 1.5, 
                                        borderRadius: 1, 
                                        display: 'inline-block',
                                        fontSize: '0.8125rem',
                                        fontFamily: 'monospace',
                                        border: '1px solid #FECACA'
                                    }}>
                                        {cambio.anterior}
                                    </Box>
                                </TableCell>

                                {/* Icono de Flecha */}
                                <TableCell align="center">
                                    <ArrowForwardIcon sx={{ color: '#CBD5E1', fontSize: 16 }} />
                                </TableCell>

                                {/* Valor Nuevo (Estilo Diff Agregado/Verde) */}
                                <TableCell sx={{ width: '35%' }}>
                                    <Box sx={{ 
                                        bgcolor: '#ECFDF5', 
                                        color: '#047857', 
                                        py: 0.5, px: 1.5, 
                                        borderRadius: 1, 
                                        display: 'inline-block',
                                        fontSize: '0.8125rem',
                                        fontFamily: 'monospace',
                                        border: '1px solid #A7F3D0'
                                    }}>
                                        {cambio.nuevo}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              ) : (
                  <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px dashed #CBD5E1' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                        No hay detalles técnicos registrados para este movimiento.
                    </Typography>
                  </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// --- COMPONENTE PRINCIPAL ---
export function MovimientosSection({ breadcrumbs = [] }) {
  // Estados de carga y datos
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtros
  const [filterAction, setFilterAction] = useState('TODAS');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Paginación y Orden
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('fecha');
  const [order, setOrder] = useState('desc');
  const [dense, setDense] = useState(false);

  // Lógica de Filtrado (Memoizada)
  const filteredMovimientos = useMemo(() => {
    let data = [...movimientosMock];

    // 1. Filtro por Acción
    if (filterAction !== 'TODAS') {
      data = data.filter((m) => m.accion === filterAction);
    }
    // 2. Filtro por Fechas
    if (dateStart) {
      data = data.filter((m) => moment(m.fecha).isSameOrAfter(dateStart, 'day'));
    }
    if (dateEnd) {
      data = data.filter((m) => moment(m.fecha).isSameOrBefore(dateEnd, 'day'));
    }
    // 3. Filtro por Texto
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter((m) =>
        m.usuarioModificador.toLowerCase().includes(query) ||
        m.usuarioAfectado.toLowerCase().includes(query) ||
        m.detalle.toLowerCase().includes(query)
      );
    }

    // 4. Ordenamiento
    data.sort((a, b) => {
      let valA = a[orderBy];
      let valB = b[orderBy];
      
      // Manejo especial para fechas
      if (orderBy === 'fecha') {
        valA = new Date(a.fecha).getTime();
        valB = new Date(b.fecha).getTime();
      }

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [searchQuery, filterAction, dateStart, dateEnd, orderBy, order]);

  // Paginación
  const totalPages = Math.ceil(filteredMovimientos.length / rowsPerPage);
  const paginatedMovimientos = filteredMovimientos.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  // Handlers
  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterAction('TODAS');
    setDateStart('');
    setDateEnd('');
    setPage(1);
  };
  
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto' }}>
      <ContentHeader
        title="Historial de Movimientos"
        description="Auditoría y registro detallado de operaciones en el sistema."
        breadcrumbs={breadcrumbs}
      />

      <Paper
        elevation={0}
        sx={{
          background: 'background.paper',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          maxWidth: '1400px',
          mx: 'auto',
          mt: 3
        }}
      >
        {/* --- BARRA DE FILTROS --- */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
          
          {/* Fila 1: Filtros Avanzados */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
             <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel id="filtro-accion-label" sx={{ fontSize: '0.875rem' }}>Tipo de Acción</InputLabel>
                <Select
                  labelId="filtro-accion-label"
                  value={filterAction}
                  label="Tipo de Acción"
                  onChange={(e) => { setFilterAction(e.target.value); setPage(1); }}
                  sx={{ backgroundColor: '#F9FAFB', fontSize: '0.875rem' }}
                >
                  <MenuItem value="TODAS">Todas</MenuItem>
                  <MenuItem value="CREACION">Creación</MenuItem>
                  <MenuItem value="MODIFICACION">Modificación</MenuItem>
                  <MenuItem value="ELIMINACION">Eliminación</MenuItem>
                </Select>
             </FormControl>

             <TextField
                label="Desde"
                type="date"
                size="small"
                value={dateStart}
                onChange={(e) => { setDateStart(e.target.value); setPage(1); }}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#F9FAFB', '& .MuiInputBase-input': { fontSize: '0.875rem' } }}
             />

             <TextField
                label="Hasta"
                type="date"
                size="small"
                value={dateEnd}
                onChange={(e) => { setDateEnd(e.target.value); setPage(1); }}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#F9FAFB', '& .MuiInputBase-input': { fontSize: '0.875rem' } }}
             />
          </Box>

          {/* Fila 2: Buscador y Acciones */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
                fullWidth
                placeholder="Buscar por usuario, detalle, etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                ),
                }}
                sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F9FAFB',
                    '& fieldset': { borderColor: '#E5E7EB' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
                '& .MuiInputBase-input': { fontSize: '0.875rem' },
                }}
            />
            
            <Tooltip title="Limpiar filtros" arrow>
                <IconButton
                    onClick={handleClearFilters}
                    sx={{
                        border: '1px solid',
                        borderColor: '#E5E7EB',
                        borderRadius: 1,
                        color: 'text.secondary',
                        '&:hover': { color: '#EF4444', backgroundColor: '#FEF2F2', borderColor: '#EF4444' },
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* --- TABLA PRINCIPAL --- */}
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                <TableCell width={50} /> {/* Espacio para flecha */}
                <TableCell sx={{ width: '12%' }}>
                  <TableSortLabel active={orderBy === 'accion'} direction={orderBy === 'accion' ? order : 'asc'} onClick={() => handleRequestSort('accion')}>
                    Acción
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: '20%' }}>
                  <TableSortLabel active={orderBy === 'usuarioModificador'} direction={orderBy === 'usuarioModificador' ? order : 'asc'} onClick={() => handleRequestSort('usuarioModificador')}>
                    Modificado Por
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: '20%' }}>
                  <TableSortLabel active={orderBy === 'usuarioAfectado'} direction={orderBy === 'usuarioAfectado' ? order : 'asc'} onClick={() => handleRequestSort('usuarioAfectado')}>
                    Afectado
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: '15%' }}>
                  <TableSortLabel active={orderBy === 'fecha'} direction={orderBy === 'fecha' ? order : 'asc'} onClick={() => handleRequestSort('fecha')}>
                    Fecha
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: '33%' }}>Resumen del Cambio</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <CircularProgress size={40} sx={{ color: 'primary.main', mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">Cargando...</Typography>
                  </TableCell>
                </TableRow>
              ) : filteredMovimientos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <SearchIcon sx={{ fontSize: 48, color: '#E5E7EB', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>Sin resultados</Typography>
                    <Typography variant="body2" color="text.secondary">Ajusta los filtros para ver más movimientos.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMovimientos.map((row) => (
                  <Row key={row.id} row={row} dense={dense} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- PAGINACIÓN --- */}
        {!loading && filteredMovimientos.length > 0 && (
          <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider', gap: 3, bgcolor: '#fff' }}>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Filas por página:</Typography>
              <FormControl size="small">
                <Select
                  value={rowsPerPage}
                  onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}
                  sx={{ height: 32, fontSize: '0.875rem', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' } }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton size="small" disabled={page === 1} onClick={() => handleChangePage(page - 1)} sx={{ border: '1px solid #E5E7EB', borderRadius: 1 }}>
                <KeyboardArrowLeftIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', minWidth: '80px', textAlign: 'center', fontFamily: 'monospace' }}>
                {page} / {totalPages}
              </Typography>
              <IconButton size="small" disabled={page === totalPages} onClick={() => handleChangePage(page + 1)} sx={{ border: '1px solid #E5E7EB', borderRadius: 1 }}>
                <KeyboardArrowRightIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}