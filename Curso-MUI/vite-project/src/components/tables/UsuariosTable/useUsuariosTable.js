// src/components/tables/UsuariosTable/useUsuariosTable.js
import { useState, useEffect } from 'react';
import { usuariosService } from '../../../services/usuariosService';

export const useUsuariosTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('apellido');
  const [order, setOrder] = useState('asc');
  const [dense, setDense] = useState(false);

  useEffect(() => {
    loadUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsuarios = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await usuariosService.getMiDestino();

      // Normaliza lo que devuelve el BFF a lo que tu tabla ya usa
      const normalizados = (data || []).map((u) => ({
        ...u,
        id: u.id ?? u.idPersonal ?? u.codEntidad ?? u.mr,
        matriculaRevista: u.matriculaRevista ?? u.mr ?? '',
        // si tu UI usa logon/jerarquia/nivel y el BFF todavía no los manda:
        logon: u.logon ?? '',
        jerarquia: u.jerarquia ?? '',
        nivel: u.nivel ?? '',
      }));

      setUsuarios(normalizados);
    } catch (e) {
      console.error('Error cargando usuarios (BFF):', e);
      setUsuarios([]);
      setError(e?.firstErrorMessage || e?.message || 'Error al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => setPage(1);

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

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

  const handleToggleDense = () => setDense(!dense);

  const filteredUsuarios = usuarios.filter((u) => {
    if (!searchQuery) return true;
    const s = searchQuery.toLowerCase();
    return (
      u.apellido?.toLowerCase().includes(s) ||
      u.nombre?.toLowerCase().includes(s) ||
      u.logon?.toLowerCase().includes(s) ||
      u.jerarquia?.toLowerCase().includes(s) ||
      u.matriculaRevista?.toLowerCase().includes(s)
    );
  });

  const sortedUsuarios = [...filteredUsuarios].sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue?.toLowerCase() || '';
    }

    if (order === 'asc') return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  });

  const totalPages = Math.ceil(sortedUsuarios.length / rowsPerPage);
  const paginatedUsuarios = sortedUsuarios.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return {
    usuarios: paginatedUsuarios,
    allUsuarios: sortedUsuarios,
    loading,
    error,
    searchQuery,
    page,
    rowsPerPage,
    orderBy,
    order,
    totalPages,
    dense,
    setSearchQuery,
    handleSearch,
    handleClearSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleToggleDense,
    loadUsuarios,
  };
};
