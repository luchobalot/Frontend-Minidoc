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
    dense,
    setSearchQuery,
    handleSearch,
    handleClearSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleToggleDense,
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
      dense={dense}
      onSearchChange={setSearchQuery}
      onSearch={handleSearch}
      onClearSearch={handleClearSearch}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onRequestSort={handleRequestSort}
      onToggleDense={handleToggleDense}
      onRetry={loadUsuarios}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddNew={onAddNew}
    />
  );
}