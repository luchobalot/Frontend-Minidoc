import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
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
  Tooltip,
  TableSortLabel,
} from '@mui/material';

import {
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

export default function UsuariosTable({
  usuarios: usuariosProp,
  loading = false,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('apellido');
  const [order, setOrder] = useState('asc');

  // ======= Datos hardcodeados =======
  const usuariosBase = [
    { id: 1, matriculaRevista: '0012345', apellido: 'Balot', nombre: 'Luciano', logon: 'lbalot', jerarquia: 'Cabo', destino: 'SIAG' },
    { id: 2, matriculaRevista: '0056789', apellido: 'Gómez', nombre: 'Martín', logon: 'mgomez', jerarquia: 'Suboficial', destino: 'Logística' },
    { id: 3, matriculaRevista: '0034567', apellido: 'Lopez', nombre: 'Juan', logon: 'jlopez', jerarquia: 'Sargento', destino: 'Comando' },
    { id: 4, matriculaRevista: '0025678', apellido: 'Perez', nombre: 'Camila', logon: 'cperez', jerarquia: 'Oficial', destino: 'Comisaría 5' },
    { id: 5, matriculaRevista: '0078904', apellido: 'Rossi', nombre: 'Valentina', logon: 'vrossi', jerarquia: 'Oficial', destino: 'Unidad Central' },
    { id: 5, matriculaRevista: '0078904', apellido: 'Rossi', nombre: 'Valentina', logon: 'vrossi', jerarquia: 'Oficial', destino: 'Unidad Central' }
  ];
  const usuarios = Array.isArray(usuariosProp) && usuariosProp.length ? usuariosProp : usuariosBase;

  const handleSearch = () => setPage(1);
  const handleClearSearch = () => { setSearchQuery(''); setPage(1); };
  const handleChangePage = (_e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(1); };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredUsuarios = usuarios.filter((u) => {
    if (!searchQuery) return true;
    const s = searchQuery.toLowerCase();
    return (
      u.apellido?.toLowerCase().includes(s) ||
      u.nombre?.toLowerCase().includes(s) ||
      u.logon?.toLowerCase().includes(s) ||
      u.jerarquia?.toLowerCase().includes(s)
    );
  });

  const sortedUsuarios = [...filteredUsuarios].sort((a, b) => {
    let aValue = a[orderBy], bValue = b[orderBy];
    if (typeof aValue === 'string') { aValue = aValue.toLowerCase(); bValue = bValue.toLowerCase(); }
    if (order === 'asc') return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  });

  const totalPages = Math.ceil(sortedUsuarios.length / rowsPerPage);
  const paginatedUsuarios = sortedUsuarios.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Paper
      elevation={0}
      sx={{
        background: '#0F172A',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: alpha('#3B82F6', 0.1),
        borderRadius: 2,
        maxWidth: '88%',
        mx: 'auto',
      }}
    >
      {/* ==== BUSCADOR ==== */}
      <Box sx={{ p: 2.5, display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, apellido, usuario o jerarquía..."
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
            '& .MuiInputBase-input': { color: 'text.primary' },
          }}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{
            minWidth: 120,
            height: 42,
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            whiteSpace: 'nowrap',
            '&:hover': { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' },
          }}
        >
          Buscar
        </Button>

        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={handleClearSearch}
          sx={{
            minWidth: 120,
            height: 42,
            borderColor: alpha('#3B82F6', 0.3),
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            '&:hover': { borderColor: alpha('#3B82F6', 0.5), backgroundColor: alpha('#3B82F6', 0.05) },
          }}
        >
          Limpiar
        </Button>

        {onAddNew && (
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={onAddNew}
            sx={{
              minWidth: 160,
              height: 42,
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              whiteSpace: 'nowrap',
              '&:hover': { background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' },
            }}
          >
            Nuevo Usuario
          </Button>
        )}
      </Box>

      {/* ==== TABLA ==== */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: alpha('#000', 0.3),
                '& th': { py: 1, px: 1.5, fontSize: '0.875rem' },
              }}
            >
              <TableCell sx={{ pl: 2.5, color: 'text.primary', fontWeight: 600, width: '8%' }}>MR</TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '15%' }}>
                <TableSortLabel
                  active={orderBy === 'apellido'}
                  direction={orderBy === 'apellido' ? order : 'asc'}
                  onClick={() => handleRequestSort('apellido')}
                  sx={{ color: 'text.primary', '&.Mui-active .MuiTableSortLabel-icon': { color: '#3B82F6' } }}
                >
                  Apellido
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '15%' }}>
                <TableSortLabel
                  active={orderBy === 'nombre'}
                  direction={orderBy === 'nombre' ? order : 'asc'}
                  onClick={() => handleRequestSort('nombre')}
                  sx={{ color: 'text.primary', '&.Mui-active .MuiTableSortLabel-icon': { color: '#3B82F6' } }}
                >
                  Nombre
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '15%' }}>Usuario</TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '15%' }}>Jerarquía</TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '20%' }}>Destino</TableCell>
              <TableCell align="right" sx={{ pr: 2.5, color: 'text.primary', fontWeight: 600, width: '12%' }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <Typography variant="body1" color="text.secondary">Cargando usuarios...</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedUsuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>No se encontraron resultados</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay usuarios registrados'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsuarios.map((u) => (
                <TableRow
                  key={u.id}
                  sx={{
                    '&:hover': { backgroundColor: alpha('#1E3A8A', 0.15) },
                    '& td': { py: 1, px: 1.5 },
                    height: 46,
                  }}
                >
                  <TableCell sx={{ pl: 2.5 }}>
                    <Chip
                      label={u.matriculaRevista || 'N/A'}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: 12,
                        backgroundColor: alpha('#3B82F6', 0.15),
                        color: '#60A5FA',
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        border: '1px solid',
                        borderColor: alpha('#3B82F6', 0.3),
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" fontWeight={600} sx={{ color: 'text.primary' }}>
                      {u.apellido || 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {u.nombre || 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                      {u.logon || 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {u.jerarquia || 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {u.destino || 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell align="right" sx={{ pr: 2.5 }}>
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="Ver detalles" arrow>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onView && onView(u)}
                          sx={{
                            width: 34,
                            height: 34,
                            minWidth: 0,
                            p: 0,
                            borderRadius: 1.2,
                            borderColor: alpha('#3B82F6', 0.3),
                            color: '#60A5FA',
                            '&:hover': {
                              borderColor: '#3B82F6',
                              backgroundColor: alpha('#3B82F6', 0.1),
                            },
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: 17 }} />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Editar" arrow>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onEdit && onEdit(u)}
                          sx={{
                            width: 34,
                            height: 34,
                            minWidth: 0,
                            p: 0,
                            borderRadius: 1.2,
                            borderColor: alpha('#F59E0B', 0.3),
                            color: '#FBBF24',
                            '&:hover': {
                              borderColor: '#F59E0B',
                              backgroundColor: alpha('#F59E0B', 0.1),
                            },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 17 }} />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Eliminar" arrow>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onDelete && onDelete(u)}
                          sx={{
                            width: 34,
                            height: 34,
                            minWidth: 0,
                            p: 0,
                            borderRadius: 1.2,
                            borderColor: alpha('#EF4444', 0.3),
                            color: '#F87171',
                            '&:hover': {
                              borderColor: '#EF4444',
                              backgroundColor: alpha('#EF4444', 0.1),
                            },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 17 }} />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ==== PAGINACIÓN ==== */}
      {!loading && sortedUsuarios.length > 0 && (
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
              Filas por página:
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
            {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, sortedUsuarios.length)} de ${sortedUsuarios.length}`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
