import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import PrimaryAppBar from "../../components/layout/AppBar/PrimaryAppBar";
import { mockNotifications } from "../../components/layout/AppBar/data/mockNotifications";
import Sidebar from "../../components/layout/Sidebar";
import { sidebarUsuarios } from "../../components/layout/Sidebar/configs/sidebarUsuarios";
// import UsuariosTable from "../../components/tables/UsuariosTable";
// import CreateUsersForm from "../../components/common/CreateUsersForm/CreateUsersForm";
// import ContentHeader from "../../components/common/ContentHeader/ContentHeader";
// import MovimientosUsuarios from "../../components/common/MovimientosUsuarios/MovimientosUsuarios";
// import UsuarioDetailModal from "../../components/common/UsuarioDetailModal/UsuarioDetailModal";
// import DeleteModal from "../../components/common/DeleteModal/DeleteModal"
// import AddIcon from "@mui/icons-material/Add";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import SearchIcon from "@mui/icons-material/Search";
// import DeleteIcon from '@mui/icons-material/Delete';

export default function PagesTest() {
  const [activeSection, setActiveSection] = useState("listado-general");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // === Store de autenticación (Zustand) ===
  const { user, logout } = useAuthStore();

  // === Navegación ===
  const navigate = useNavigate();

  // === Logout ===
  const handleLogout = () => {
    logout(); // Limpia Zustand
    navigate("/login", { replace: true }); // Redirige al login
  };

  // === Contenido dinámico según la sección activa ===
  const renderContent = () => {
    return (
      <Box sx={{ width: "100%", maxWidth: "1400px", p: 3 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            p: 4,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Sección activa: {activeSection}</h2>
          <p>El contenido de las tablas y formularios está comentado.</p>
        </Box>
      </Box>
    );

    /*
    switch (activeSection) {
      case "listado-general":
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Listado General de Usuarios"
              description="Visualiza todos los usuarios registrados en el sistema MINIDOC."
              actions={[
                {
                  label: "Nuevo Usuario",
                  icon: <AddIcon />,
                  color: "success"
                },
                {
                  label: "Actualizar",
                  icon: <RefreshIcon />,
                  variant: "outlined"
                },
              ]}
            />
            <UsuariosTable 
              onView={handleViewUsuario}
              onEdit={handleEditUsuario}
              onDelete={handleDeleteUsuario}
            />
          </Box>
        );

      case "busqueda-avanzada":
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Búsqueda Avanzada"
              description="Busca usuarios por múltiples criterios de filtrado."
              actions={[
                {
                  label: "Buscar",
                  icon: <SearchIcon />,
                },
              ]}
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
            </Box>
          </Box>
        );

      case "agregar-usuario":
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Agregar Usuario"
              description="Complete el formulario para registrar un nuevo usuario en el sistema."
              actions={[
                {
                  label: "Limpiar formulario",
                  icon: <DeleteIcon />
                },
              ]}
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
            </Box>
            <CreateUsersForm/>
          </Box>
        );

      case "modificar-usuario":
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Modificar Usuario"
              description="Selecciona un usuario existente y actualiza su información."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>Formulario de edición de usuario.</p>
            </Box>
          </Box>
        );

      case "movimientos":
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Movimientos y Auditoría"
              description="Registro completo de todos los cambios realizados en la sección de Usuarios."
              actions={[
                {
                  label: "Actualizar",
                  icon: <RefreshIcon />,
                  variant: "outlined",
                  onClick: () => console.log("Actualizar registros"),
                },
              ]}
            />
            <MovimientosUsuarios />
          </Box>
        );

      default:
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Sección no encontrada"
              description="Selecciona una opción válida en el menú lateral."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>No hay contenido disponible.</p>
            </Box>
          </Box>
        );
    }
    */
  };

  // === Datos completos para el modal (ejemplo de usuarios) ===
  /*
  const usuariosCompletos = [
    { 
      id: 1, 
      matriculaRevista: '0012345', 
      apellido: 'Balot', 
      nombre: 'Luciano', 
      logon: 'lbalot', 
      jerarquia: 'Cabo', 
      destino: 'SIAG',
      cuerpo: 'Infantería',
      escalafon: 'Comando',
      nivel: 'Nivel 3',
      tipoClasificacion: 'Confidencial',
      confianza: true,
      superConfianza: false,
      fechaCreacion: '2024-01-15T10:30:00'
    },
    { 
      id: 2, 
      matriculaRevista: '0056789', 
      apellido: 'Gomez', 
      nombre: 'Martin', 
      logon: 'mgomez', 
      jerarquia: 'Suboficial', 
      destino: 'Logística',
      cuerpo: 'Comunicaciones',
      escalafon: 'Técnico',
      nivel: 'Nivel 4',
      tipoClasificacion: 'Secreto',
      confianza: true,
      superConfianza: true,
      fechaCreacion: '2023-11-20T14:45:00'
    },
    { 
      id: 3, 
      matriculaRevista: '0034567', 
      apellido: 'Lopez', 
      nombre: 'Juan', 
      logon: 'jlopez', 
      jerarquia: 'Sargento', 
      destino: 'Comando',
      cuerpo: 'Artillería',
      escalafon: 'Operaciones',
      nivel: 'Nivel 2',
      tipoClasificacion: 'Restringido',
      confianza: false,
      superConfianza: false,
      fechaCreacion: '2024-03-10T09:15:00'
    },
    { 
      id: 4, 
      matriculaRevista: '0025678', 
      apellido: 'Perez', 
      nombre: 'Camila', 
      logon: 'cperez', 
      jerarquia: 'Oficial', 
      destino: 'Comisaría 5',
      cuerpo: 'Ingenieros',
      escalafon: 'Logística',
      nivel: 'Nivel 5',
      tipoClasificacion: 'Alto Secreto',
      confianza: true,
      superConfianza: true,
      fechaCreacion: '2023-08-05T16:20:00'
    },
    { 
      id: 5, 
      matriculaRevista: '0078904', 
      apellido: 'Rossi', 
      nombre: 'Valentina', 
      logon: 'vrossi', 
      jerarquia: 'Oficial', 
      destino: 'Unidad Central',
      cuerpo: 'Caballería',
      escalafon: 'Administrativo',
      nivel: 'Nivel 3',
      tipoClasificacion: 'Confidencial',
      confianza: true,
      superConfianza: false,
      fechaCreacion: '2024-02-28T11:00:00'
    },
    { 
      id: 6, 
      matriculaRevista: '0078905', 
      apellido: 'Martinez', 
      nombre: 'Diego', 
      logon: 'dmartinez', 
      jerarquia: 'Cabo', 
      destino: 'Unidad Norte',
      cuerpo: 'Infantería',
      escalafon: 'Combate',
      nivel: 'Nivel 2',
      tipoClasificacion: 'Público',
      confianza: false,
      superConfianza: false,
      fechaCreacion: '2024-04-12T08:30:00'
    }
  ];
  */

  // === Manejo de modales (comentados) ===
  /*
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);
  */

  /*
  const handleViewUsuario = (usuario) => {
    const usuarioCompleto = usuariosCompletos.find(u => u.id === usuario.id);
    if (usuarioCompleto) {
      setSelectedUsuario(usuarioCompleto);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedUsuario(null);
      setModalError(null);
    }, 300);
  };

  const handleRefreshModal = () => {
    if (selectedUsuario) {
      setModalError(null);
      setModalLoading(true);
      setTimeout(() => {
        setModalLoading(false);
      }, 1000);
    }
  };

  const handleEditUsuario = (usuario) => {
    console.log('Editar usuario:', usuario);
  };

  const handleDeleteUsuario = (usuario) => {
    setSelectedDeleteItem(usuario);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Eliminando usuario:', selectedDeleteItem);
    setDeleteModalOpen(false);
    setSelectedDeleteItem(null);
  };
  */

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F1F5F9", display: "flex" }}>
      {/* Sidebar fijo */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1200,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-280px)",
        }}
      >
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          sections={sidebarUsuarios}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          variant="persistent"
        />
      </Box>

      {/* Contenedor principal */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: "100vh",
          transition: "margin-left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          marginLeft: sidebarOpen ? "280px" : "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* === AppBar genérico conectado a tu sistema === */}
        <PrimaryAppBar
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          onLogout={handleLogout}
          showNotifications={true}
          notifications={mockNotifications}
        />

        {/* Contenido dinámico */}
        <Box
          sx={{
            flexGrow: 1,
            mt: 10,
            py: 4,
            px: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {renderContent()}
        </Box>
      </Box>

      {/* === Modales (mantienen tu código original) === */}
      {/*
      <UsuarioDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        usuario={selectedUsuario}
        loading={modalLoading}
        error={modalError}
        onRefresh={handleRefreshModal}
      />

      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message={`¿Estás seguro que deseas eliminar a ${selectedDeleteItem?.nombre} ${selectedDeleteItem?.apellido}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loadingText="Eliminando..."
      />
      */}
    </Box>
  );
}
