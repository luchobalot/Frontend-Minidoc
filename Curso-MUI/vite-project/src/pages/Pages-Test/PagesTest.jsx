import React, { useState } from 'react';
import { Box } from "@mui/material";
import PrimaryAppBar from "../../components/layout/AppBar/PrimaryAppBar";
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
  
  // Estados para el modal de detalles
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedUsuario, setSelectedUsuario] = useState(null);
  // const [modalLoading, setModalLoading] = useState(false);
  // const [modalError, setModalError] = useState(null);

  // Estados para el modal de eliminacion
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

  // Datos completos para el modal
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
      cuerpo: 'Infanteria',
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
      destino: 'Logistica',
      cuerpo: 'Comunicaciones',
      escalafon: 'Tecnico',
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
      cuerpo: 'Artilleria',
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
      destino: 'Comisaria 5',
      cuerpo: 'Ingenieros',
      escalafon: 'Logistica',
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
      cuerpo: 'Caballeria',
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
      cuerpo: 'Infanteria',
      escalafon: 'Combate',
      nivel: 'Nivel 2',
      tipoClasificacion: 'Publico',
      confianza: false,
      superConfianza: false,
      fechaCreacion: '2024-04-12T08:30:00'
    }
  ];
  */

  // Abrir el modal
  /*
  const handleViewUsuario = (usuario) => {
    const usuarioCompleto = usuariosCompletos.find(u => u.id === usuario.id);
    if (usuarioCompleto) {
      setSelectedUsuario(usuarioCompleto);
      setModalOpen(true);
    }
  };
  */

  // Cerrar el modal
  /*
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedUsuario(null);
      setModalError(null);
    }, 300);
  };
  */

  // Refrescar datos
  /*
  const handleRefreshModal = () => {
    if (selectedUsuario) {
      setModalError(null);
      setModalLoading(true);
      setTimeout(() => {
        setModalLoading(false);
      }, 1000);
    }
  };
  */

  // Editar usuario
  /*
  const handleEditUsuario = (usuario) => {
    console.log('Editar usuario:', usuario);
  };
  */

  // Abrir modal de eliminacion
  /*
  const handleDeleteUsuario = (usuario) => {
    setSelectedDeleteItem(usuario);
    setDeleteModalOpen(true);
  };
  */

  // Confirmar eliminacion
  /*
  const handleConfirmDelete = async () => {
    console.log('Eliminando usuario:', selectedDeleteItem);
    setDeleteModalOpen(false);
    setSelectedDeleteItem(null);
  };
  */

  
  // Contenido dinamico segun seccion activa
  const renderContent = () => {
    return (
      <Box sx={{ width: '100%', maxWidth: '1400px', p: 3 }}>
        <Box sx={{ 
          bgcolor: 'white', 
          borderRadius: 2, 
          p: 4,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2>Seccion activa: {activeSection}</h2>
          <p>El contenido de las tablas y formularios esta comentado.</p>
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
              title="Busqueda Avanzada"
              description="Busca usuarios por multiples criterios de filtrado."
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
              description="Selecciona un usuario existente y actualiza su informacion."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>Formulario de edicion de usuario.</p>
            </Box>
          </Box>
        );
        
        case "movimientos":
          return (
            <Box sx={{ width: '100%', maxWidth: '1400px' }}>
              <ContentHeader
                title="Movimientos y Auditoria"
                description="Registro completo de todos los cambios realizados en la seccion de Usuarios."
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
              title="Seccion no encontrada"
              description="Selecciona una opcion valida en el menu lateral."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>No hay contenido disponible.</p>
            </Box>
          </Box>
        );
    }
    */
  };
  
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F1F5F9", display: "flex" }}>
      {/* Sidebar fijo */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1200,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-280px)',
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
          width: '100%',
          minHeight: '100vh',
          transition: 'margin-left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          marginLeft: sidebarOpen ? '280px' : '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* AppBar */}
        <PrimaryAppBar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          pageTitle="Gestion de Usuarios"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Contenido dinamico segun la seccion */}
        <Box 
          sx={{ 
            flexGrow: 1,
            mt: 10,
            py: 4,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {renderContent()}
        </Box>
      </Box>

      {/* Modal de detalles del usuario */}
      {/*
      <UsuarioDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        usuario={selectedUsuario}
        loading={modalLoading}
        error={modalError}
        onRefresh={handleRefreshModal}
      />
      */}

      {/* Modal de eliminacion */}
      {/*
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message={`Estas seguro que deseas eliminar a ${selectedDeleteItem?.nombre} ${selectedDeleteItem?.apellido}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loadingText="Eliminando..."
      />
      */}
    </Box>
  );
}