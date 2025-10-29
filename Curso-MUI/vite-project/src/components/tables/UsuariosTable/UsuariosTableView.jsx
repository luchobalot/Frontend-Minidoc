// src/components/tables/UsuariosTable/UsuariosTableView.jsx
import React from 'react';
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
  CircularProgress,
  Alert,
} from '@mui/material';

import {
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Clear as ClearIcon,
  ErrorOutline as ErrorOutlineIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

export default function UsuariosTableView({
  usuarios,
  allUsuarios,
  loading,
  error,
  searchQuery,
  page,
  rowsPerPage,
  orderBy,
  order,
  totalPages,
  onSearchChange,
  onSearch,
  onClearSearch,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  onRetry,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        background: 'background.paper',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.secondary.main, 0.1),
        borderRadius: 2,
        maxWidth: '1400px',
        mx: 'auto',
      }}
    >
      {/* Buscador */}
      <Box sx={{ p: 2.5, display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, apellido, usuario, jerarquia o matricula..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          disabled={loading}
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
              backgroundColor: (theme) => alpha(theme.palette.secondary.dark, 0.3),
              '& fieldset': {
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2)
              },
              '&:hover fieldset': {
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.4)
              },
              '&.Mui-focused fieldset': {
                borderColor: 'secondary.main'
              },
            },
            '& .MuiInputBase-input': { color: 'text.primary' },
          }}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onSearch}
          disabled={loading}
          sx={{
            minWidth: 120,
            height: 42,
            background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
            whiteSpace: 'nowrap',
            '&:hover': {
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
            },
          }}
        >
          Buscar
        </Button>

        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={onClearSearch}
          disabled={loading}
          sx={{
            minWidth: 120,
            height: 42,
            borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            '&:hover': {
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.5),
              backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.05)
            },
          }}
        >
          Limpiar
        </Button>

        {onAddNew && (
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={onAddNew}
            disabled={loading}
            sx={{
              minWidth: 160,
              height: 42,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
              whiteSpace: 'nowrap',
              '&:hover': {
                background: (theme) => `linear-gradient(135deg, ${theme.palette.success.dark} 0%, #047857 100%)`
              },
            }}
          >
            Nuevo Usuario
          </Button>
        )}
      </Box>

      {/* Mensaje de error */}
      {error && (
        <Box sx={{ px: 2.5, pb: 2 }}>
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon />}
            action={
              <Button
                color="inherit"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={onRetry}
              >
                Reintentar
              </Button>
            }
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.15),
              color: 'error.light',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.error.main, 0.3),
            }}
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Tabla */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: (theme) => alpha(theme.palette.common.black, 0.3),
                '& th': { py: 1, px: 1.5, fontSize: '0.875rem' },
              }}
            >
              <TableCell sx={{ pl: 2.5, color: 'text.primary', fontWeight: 600, width: '10%' }}>
                <TableSortLabel
                  active={orderBy === 'matriculaRevista'}
                  direction={orderBy === 'matriculaRevista' ? order : 'asc'}
                  onClick={() => onRequestSort('matriculaRevista')}
                  sx={{
                    color: 'text.primary',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'secondary.main' }
                  }}
                >
                  MR
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '15%' }}>
                <TableSortLabel
                  active={orderBy === 'apellido'}
                  direction={orderBy === 'apellido' ? order : 'asc'}
                  onClick={() => onRequestSort('apellido')}
                  sx={{
                    color: 'text.primary',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'secondary.main' }
                  }}
                >
                  Apellido
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '15%' }}>
                <TableSortLabel
                  active={orderBy === 'nombre'}
                  direction={orderBy === 'nombre' ? order : 'asc'}
                  onClick={() => onRequestSort('nombre')}
                  sx={{
                    color: 'text.primary',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'secondary.main' }
                  }}
                >
                  Nombre
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '13%' }}>
                <TableSortLabel
                  active={orderBy === 'logon'}
                  direction={orderBy === 'logon' ? order : 'asc'}
                  onClick={() => onRequestSort('logon')}
                  sx={{
                    color: 'text.primary',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'secondary.main' }
                  }}
                >
                  Usuario
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '13%' }}>
                <TableSortLabel
                  active={orderBy === 'jerarquia'}
                  direction={orderBy === 'jerarquia' ? order : 'asc'}
                  onClick={() => onRequestSort('jerarquia')}
                  sx={{
                    color: 'text.primary',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'secondary.main' }
                  }}
                >
                  Jerarquia
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600, width: '20%' }}>
                <TableSortLabel
                  active={orderBy === 'destino'}
                  direction={orderBy === 'destino' ? order : 'asc'}
                  onClick={() => onRequestSort('destino')}
                  sx={{
                    color: 'text.primary',
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'secondary.main' }
                  }}
                >
                  Destino
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ pr: 2.5, color: 'text.primary', fontWeight: 600, width: '14%' }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={40} sx={{ color: 'secondary.main', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Cargando usuarios...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Error al cargar los datos
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={onRetry}
                    sx={{ mt: 2 }}
                  >
                    Reintentar
                  </Button>
                </TableCell>
              </TableRow>
            ) : usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No se encontraron resultados
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery ? 'Intenta con otros terminos de busqueda' : 'No hay usuarios registrados'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((u) => (
                <TableRow
                  key={u.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: (theme) => alpha(theme.palette.secondary.dark, 0.15)
                    },
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
                        backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.15),
                        color: 'info.main',
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        border: '1px solid',
                        borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
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
                            borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
                            color: 'info.main',
                            '&:hover': {
                              borderColor: 'secondary.main',
                              backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.1),
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
                            borderColor: (theme) => alpha(theme.palette.warning.main, 0.3),
                            color: 'warning.light',
                            '&:hover': {
                              borderColor: 'warning.main',
                              backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.1),
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
                            borderColor: (theme) => alpha(theme.palette.error.main, 0.3),
                            color: 'error.light',
                            '&:hover': {
                              borderColor: 'error.main',
                              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
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

      {/* Paginacion */}
      {!loading && !error && allUsuarios.length > 0 && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            borderTop: '1px solid',
            borderColor: (theme) => alpha(theme.palette.secondary.main, 0.1),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Filas por pagina:
            </Typography>
            <FormControl size="small">
              <Select
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
                sx={{
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2)
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme) => alpha(theme.palette.secondary.main, 0.4)
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  },
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
            onChange={onPageChange}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'text.secondary',
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.1)
                },
                '&.Mui-selected': {
                  backgroundColor: 'secondary.main',
                  color: 'primary.contrastText',
                  '&:hover': { backgroundColor: 'primary.main' },
                },
              },
            }}
          />

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, allUsuarios.length)} de ${allUsuarios.length}`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}