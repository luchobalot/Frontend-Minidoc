// src/components/tables/UsuariosTable/UsuariosTable.jsx
import React from 'react';
import { useUsuariosTable } from './useUsuariosTable';
import UsuariosTableView from './UsuariosTableView';

export default function UsuariosTable({
  onView,
  onEdit,
  onDelete,
  onAddNew,
}) {
  const {
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
    setSearchQuery,
    handleSearch,
    handleClearSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    loadUsuarios,
  } = useUsuariosTable();

  return (
    <UsuariosTableView
      usuarios={usuarios}
      allUsuarios={allUsuarios}
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      page={page}
      rowsPerPage={rowsPerPage}
      orderBy={orderBy}
      order={order}
      totalPages={totalPages}
      onSearchChange={setSearchQuery}
      onSearch={handleSearch}
      onClearSearch={handleClearSearch}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onRequestSort={handleRequestSort}
      onRetry={loadUsuarios}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddNew={onAddNew}
    />
  );
}