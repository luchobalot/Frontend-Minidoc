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
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  ErrorOutline as ErrorOutlineIcon,
  Refresh as RefreshIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';

// Importamos la función desde el archivo de utilidades
import { getNivelConfig } from './usuariosUtils';

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
  onRetry,
  onView,
  onEdit,
  onDelete,
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
      {/* Buscador Mejorado */}
      <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, apellido, usuario, jerarquía o matrícula..."
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
              height: 40,
              backgroundColor: '#F9FAFB',
              '& fieldset': { borderColor: '#E5E7EB' },
              '&:hover fieldset': { borderColor: '#D1D5DB' },
              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
            },
            '& .MuiInputBase-input': { fontSize: '0.875rem' },
          }}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onSearch}
          disabled={loading}
          sx={{
            height: 40,
            px: 3,
            background: 'primary.main',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              background: 'primary.dark',
              boxShadow: 'none',
            },
          }}
        >
          Buscar
        </Button>

        {/* Botón Minimalista de Limpiar (Tachito) */}
        <Tooltip title="Limpiar filtros" arrow>
          <IconButton
            onClick={onClearSearch}
            disabled={loading}
            sx={{
              height: 40,
              width: 40,
              border: '1px solid',
              borderColor: '#E5E7EB',
              borderRadius: 1,
              color: 'text.secondary',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: '#EF4444',
                color: '#EF4444',
                backgroundColor: '#FEF2F2'
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Mensaje de error */}
      {error && (
        <Box sx={{ px: 2, py: 1.5 }}>
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon />}
            action={
              <Button color="inherit" size="small" startIcon={<RefreshIcon />} onClick={onRetry}>
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
                  py: dense ? 1 : 1.5,
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
                >
                  MR
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '25%' }}>
                <TableSortLabel
                  active={orderBy === 'apellido'}
                  direction={orderBy === 'apellido' ? order : 'asc'}
                  onClick={() => onRequestSort('apellido')}
                >
                  Usuario
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '15%' }}>
                <TableSortLabel
                  active={orderBy === 'nivel'}
                  direction={orderBy === 'nivel' ? order : 'asc'}
                  onClick={() => onRequestSort('nivel')}
                >
                  Nivel
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '12%' }}>
                <TableSortLabel
                  active={orderBy === 'jerarquia'}
                  direction={orderBy === 'jerarquia' ? order : 'asc'}
                  onClick={() => onRequestSort('jerarquia')}
                >
                  Jerarquía
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: '23%' }}>
                <TableSortLabel
                  active={orderBy === 'destino'}
                  direction={orderBy === 'destino' ? order : 'asc'}
                  onClick={() => onRequestSort('destino')}
                >
                  Destino
                </TableSortLabel>
              </TableCell>
              
              {/* Encabezado de Acciones Centrado */}
              <TableCell align="center" sx={{ width: '15%' }}>
                Acciones
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
                  <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRetry} sx={{ mt: 2 }}>
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
                    {searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay usuarios registrados'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((u) => {
                // Usamos la función importada
                const nivelConfig = getNivelConfig(u.nivel);
                
                return (
                  <TableRow
                    key={u.id ?? u.idPersonal ?? u.codEntidad ?? u.mr}

                    sx={{
                      '&:hover': { backgroundColor: '#FAFAFA' },
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
                          '& .MuiChip-label': { px: 1 }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: dense ? '0.8125rem' : '0.875rem' }}>
                        {u.jerarquia || 'N/A'}
                      </Typography>
                    </TableCell>

                    {/* --- INICIO AJUSTE FINAL PARA 900PX+ --- */}
                    <TableCell
                      sx={{
                         // Extendemos la limitación hasta 'lg' (1200px) para cubrir el caso de 902px
                         // xs (0-600): 150px
                         // sm (600-900): 150px
                         // md (900-1200): 220px (Damos un poco más de aire, pero limitado)
                         // lg (1200+): Sin límite
                         maxWidth: { xs: 150, md: 220, lg: 'none' },
                      }}
                    >
                      <Tooltip title={u.destino || ''} arrow placement="top-start">
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary', 
                            fontSize: dense ? '0.8125rem' : '0.875rem',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            // CAMBIO CLAVE: Cambiamos 'md' por 'lg'.
                            // Ahora se corta a 2 líneas en 'xs', 'sm' Y 'md' (incluye tu 902px).
                            // Solo se libera en 'lg' (pantallas muy grandes > 1200px).
                            WebkitLineClamp: { xs: 2, lg: 'none' }, 
                            wordBreak: 'break-word'
                          }}
                        >
                          {u.destino || 'N/A'}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    {/* --- FIN AJUSTE --- */}

                    {/* Botones de Acciones Centrados */}
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title="Ver" arrow>
                          <IconButton
                            size="small"
                            onClick={() => onView && onView(u)}
                            sx={{
                              width: dense ? 28 : 32,
                              height: dense ? 28 : 32,
                              color: '#3B82F6',
                              '&:hover': { backgroundColor: '#EFF6FF' },
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
                              '&:hover': { backgroundColor: '#FEF3C7' },
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
                              '&:hover': { backgroundColor: '#FEE2E2' },
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

      {/* Paginación */}
      {!loading && !error && allUsuarios.length > 0 && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
            gap: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Por página:
            </Typography>
            <FormControl size="small">
              <Select
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
                sx={{
                  height: 32,
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                '&:hover': { backgroundColor: '#F9FAFB', borderColor: '#D1D5DB' },
                '&.Mui-disabled': { borderColor: '#F3F4F6', color: '#D1D5DB' }
              }}
            >
              <KeyboardArrowLeftIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', minWidth: '120px', textAlign: 'center' }}>
              {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, allUsuarios.length)} de ${allUsuarios.length}`}
            </Typography>
            
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
                '&:hover': { backgroundColor: '#F9FAFB', borderColor: '#D1D5DB' },
                '&.Mui-disabled': { borderColor: '#F3F4F6', color: '#D1D5DB' }
              }}
            >
              <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
}