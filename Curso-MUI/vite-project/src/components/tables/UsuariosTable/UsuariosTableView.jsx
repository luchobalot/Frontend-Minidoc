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
  Stack,
  IconButton,
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
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';

const getNivelConfig = (nivelString) => {
  if (!nivelString) {
    return { 
      label: 'Sin Nivel', 
      color: '#6B7280', 
      bgColor: '#F3F4F6', 
      borderColor: '#D1D5DB',
    };
  }

  const nivelLower = nivelString.toLowerCase();
  
  if (nivelLower.includes('dios')) {
    return { 
      label: 'DIOS', 
      color: '#7C3AED', 
      bgColor: '#F3E8FF', 
      borderColor: '#C084FC',
    };
  }
  
  if (nivelLower.includes('super') || nivelLower.includes('superadministrador')) {
    return { 
      label: 'Super Admin', 
      color: '#DC2626', 
      bgColor: '#FEE2E2', 
      borderColor: '#FCA5A5',
    };
  }
  
  if (nivelLower.includes('administrador')) {
    return { 
      label: 'Administrador', 
      color: '#EA580C', 
      bgColor: '#FED7AA', 
      borderColor: '#FDBA74',
    };
  }
  
  if (nivelLower.includes('operador')) {
    return { 
      label: 'Operador', 
      color: '#059669', 
      bgColor: '#D1FAE5', 
      borderColor: '#6EE7B7',
    };
  }

  return { 
    label: nivelString, 
    color: '#6B7280', 
    bgColor: '#F3F4F6', 
    borderColor: '#D1D5DB',
  };
};

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
  dense,
  onSearchChange,
  onSearch,
  onClearSearch,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  onToggleDense,
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
        borderColor: 'divider',
        borderRadius: 2,
        maxWidth: '1400px',
        mx: 'auto',
      }}
    >
      {/* Buscador */}
      <Box sx={{ p: 2, display: 'flex', gap: 1.5, alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, apellido, usuario, jerarquia o matricula..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          disabled={loading}
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
              height: 36,
              backgroundColor: '#F9FAFB',
              '& fieldset': {
                borderColor: '#E5E7EB'
              },
              '&:hover fieldset': {
                borderColor: '#D1D5DB'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: '2px'
              },
            },
            '& .MuiInputBase-input': { 
              color: 'text.primary',
              fontSize: '0.875rem'
            },
          }}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon sx={{ fontSize: 18 }} />}
          onClick={onSearch}
          disabled={loading}
          sx={{
            minWidth: 100,
            height: 36,
            background: 'primary.main',
            whiteSpace: 'nowrap',
            fontSize: '0.875rem',
            '&:hover': {
              background: 'primary.dark'
            },
          }}
        >
          Buscar
        </Button>

        <Button
          variant="outlined"
          startIcon={<ClearIcon sx={{ fontSize: 18 }} />}
          onClick={onClearSearch}
          disabled={loading}
          sx={{
            minWidth: 100,
            height: 36,
            borderColor: '#D1D5DB',
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            fontSize: '0.875rem',
            '&:hover': {
              borderColor: '#9CA3AF',
              backgroundColor: '#F9FAFB'
            },
          }}
        >
          Limpiar
        </Button>

        {onAddNew && (
          <Button
            variant="contained"
            startIcon={<PersonAddIcon sx={{ fontSize: 18 }} />}
            onClick={onAddNew}
            disabled={loading}
            sx={{
              minWidth: 140,
              height: 36,
              background: 'success.main',
              whiteSpace: 'nowrap',
              fontSize: '0.875rem',
              '&:hover': {
                background: 'success.dark'
              },
            }}
          >
            Nuevo Usuario
          </Button>
        )}
      </Box>

      {/* Mensaje de error */}
      {error && (
        <Box sx={{ px: 2, py: 1.5 }}>
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
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              border: '1px solid',
              borderColor: '#FCA5A5',
            }}
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Tabla */}
      <TableContainer>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: '#FAFAFA',
                '& th': { 
                  py: dense ? 0.75 : 1.25, 
                  px: 2, 
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#6B7280',
                  borderBottom: '1px solid #E5E7EB',
                },
              }}
            >
              <TableCell sx={{ width: '10%' }}>
                <TableSortLabel
                  active={orderBy === 'matriculaRevista'}
                  direction={orderBy === 'matriculaRevista' ? order : 'asc'}
                  onClick={() => onRequestSort('matriculaRevista')}
                  sx={{
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'primary.main' }
                  }}
                >
                  MR
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '25%' }}>
                <TableSortLabel
                  active={orderBy === 'apellido'}
                  direction={orderBy === 'apellido' ? order : 'asc'}
                  onClick={() => onRequestSort('apellido')}
                  sx={{
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'primary.main' }
                  }}
                >
                  Usuarios
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '15%' }}>
                <TableSortLabel
                  active={orderBy === 'nivel'}
                  direction={orderBy === 'nivel' ? order : 'asc'}
                  onClick={() => onRequestSort('nivel')}
                  sx={{
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'primary.main' }
                  }}
                >
                  Nivel
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '12%' }}>
                <TableSortLabel
                  active={orderBy === 'jerarquia'}
                  direction={orderBy === 'jerarquia' ? order : 'asc'}
                  onClick={() => onRequestSort('jerarquia')}
                  sx={{
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'primary.main' }
                  }}
                >
                  Jerarquia
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '23%' }}>
                <TableSortLabel
                  active={orderBy === 'destino'}
                  direction={orderBy === 'destino' ? order : 'asc'}
                  onClick={() => onRequestSort('destino')}
                  sx={{
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-active .MuiTableSortLabel-icon': { color: 'primary.main' }
                  }}
                >
                  Destino
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ width: '15%', pr: 2.5 }}>
                
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={40} sx={{ color: 'primary.main', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Cargando usuarios...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
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
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No se encontraron resultados
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery ? 'Intenta con otros terminos de busqueda' : 'No hay usuarios registrados'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((u) => {
                const nivelConfig = getNivelConfig(u.nivel);
                return (
                  <TableRow
                    key={u.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#FAFAFA'
                      },
                      '& td': { 
                        py: dense ? 0.75 : 1.25, 
                        px: 2,
                        borderBottom: '1px solid #F3F4F6'
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={u.matriculaRevista || 'N/A'}
                        size="small"
                        sx={{
                          height: dense ? 20 : 22,
                          fontSize: dense ? '0.7rem' : '0.75rem',
                          backgroundColor: '#EFF6FF',
                          color: '#1E40AF',
                          fontWeight: 600,
                          fontFamily: 'monospace',
                          border: '1px solid',
                          borderColor: '#BFDBFE',
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography 
                          variant="body2" 
                          fontWeight={600} 
                          sx={{ 
                            color: 'text.primary',
                            fontSize: dense ? '0.8125rem' : '0.875rem',
                            lineHeight: 1.4
                          }}
                        >
                          {u.apellido || 'N/A'}, {u.nombre || 'N/A'}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: dense ? '0.7rem' : '0.75rem',
                            fontFamily: 'monospace'
                          }}
                        >
                          {u.logon || u.userName || 'N/A'}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={nivelConfig.label}
                        size="small"
                        sx={{
                          height: dense ? 20 : 24,
                          fontSize: dense ? '0.7rem' : '0.75rem',
                          backgroundColor: nivelConfig.bgColor,
                          color: nivelConfig.color,
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: nivelConfig.borderColor,
                          '& .MuiChip-label': {
                            px: 1
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: dense ? '0.8125rem' : '0.875rem' }}>
                        {u.jerarquia || 'N/A'}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: dense ? '0.8125rem' : '0.875rem' }}>
                        {u.destino || 'N/A'}
                      </Typography>
                    </TableCell>

                    <TableCell align="right" sx={{ pr: 2.5 }}>
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="Ver" arrow>
                          <IconButton
                            size="small"
                            onClick={() => onView && onView(u)}
                            sx={{
                              width: dense ? 28 : 32,
                              height: dense ? 28 : 32,
                              color: '#3B82F6',
                              border: '1px solid transparent',
                              '&:hover': {
                                backgroundColor: '#EFF6FF',
                                borderColor: '#BFDBFE',
                              },
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: dense ? 16 : 18 }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar" arrow>
                          <IconButton
                            size="small"
                            onClick={() => onEdit && onEdit(u)}
                            sx={{
                              width: dense ? 28 : 32,
                              height: dense ? 28 : 32,
                              color: '#F59E0B',
                              border: '1px solid transparent',
                              '&:hover': {
                                backgroundColor: '#FEF3C7',
                                borderColor: '#FDE68A',
                              },
                            }}
                          >
                            <EditIcon sx={{ fontSize: dense ? 16 : 18 }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar" arrow>
                          <IconButton
                            size="small"
                            onClick={() => onDelete && onDelete(u)}
                            sx={{
                              width: dense ? 28 : 32,
                              height: dense ? 28 : 32,
                              color: '#EF4444',
                              border: '1px solid transparent',
                              '&:hover': {
                                backgroundColor: '#FEE2E2',
                                borderColor: '#FECACA',
                              },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: dense ? 16 : 18 }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginacion */}
      {!loading && !error && allUsuarios.length > 0 && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Toggle de densidad */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={onToggleDense}
          >
            <Box
              sx={{
                width: 36,
                height: 20,
                borderRadius: 10,
                backgroundColor: dense ? '#3B82F6' : '#E5E7EB',
                position: 'relative',
                transition: 'all 0.3s',
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  position: 'absolute',
                  top: 2,
                  left: dense ? 18 : 2,
                  transition: 'all 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Comprimir
            </Typography>
          </Box>

          {/* Centro - Paginacion */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                Usuarios por página:
              </Typography>
              <FormControl size="small">
                <Select
                  value={rowsPerPage}
                  onChange={onRowsPerPageChange}
                  sx={{
                    height: 32,
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D1D5DB'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main'
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

            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, allUsuarios.length)} de ${allUsuarios.length}`}
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                disabled={page === 1}
                onClick={(e) => onPageChange(e, page - 1)}
                sx={{
                  width: 32,
                  height: 32,
                  border: '1px solid',
                  borderColor: '#E5E7EB',
                  borderRadius: 1,
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: '#F9FAFB',
                    borderColor: '#D1D5DB'
                  },
                  '&.Mui-disabled': {
                    borderColor: '#F3F4F6',
                    color: '#D1D5DB'
                  }
                }}
              >
                <KeyboardArrowLeftIcon sx={{ fontSize: 20 }} />
              </IconButton>
              
              <IconButton
                size="small"
                disabled={page === totalPages}
                onClick={(e) => onPageChange(e, page + 1)}
                sx={{
                  width: 32,
                  height: 32,
                  border: '1px solid',
                  borderColor: '#E5E7EB',
                  borderRadius: 1,
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: '#F9FAFB',
                    borderColor: '#D1D5DB'
                  },
                  '&.Mui-disabled': {
                    borderColor: '#F3F4F6',
                    color: '#D1D5DB'
                  }
                }}
              >
                <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Espacio derecho vacio para balance */}
          <Box sx={{ width: 100 }} />
        </Box>
      )}
    </Paper>
  );
}