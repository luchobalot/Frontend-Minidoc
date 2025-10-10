import React, { useState } from 'react';
import { Box } from "@mui/material";
import PrimaryAppBar from "../../components/layout/AppBar/PrimaryAppBar";
import SidebarDrawer from "../../components/layout/Sidebar/SidebarDrawer";
import { sidebarUsuarios } from "../../components/layout/Sidebar/configs/sidebarUsuarios";
import UsuariosTable from "../../components/tables/UsuariosTable";
import CreateUsersForm from "../../components/common/CreateUsersForm/CreateUsersForm";
import ContentHeader from "../../components/common/ContentHeader/ContentHeader";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

export default function PagesTest() {
  const [activeSection, setActiveSection] = useState("listado-general");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Contenido dinamico segun seccion activa
  const renderContent = () => {
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
                  color: "success",
                  onClick: () => console.log("Nuevo usuario"),
                },
                {
                  label: "Actualizar",
                  icon: <RefreshIcon />,
                  variant: "outlined",
                  onClick: () => console.log("Actualizar lista"),
                },
              ]}
            />
            <UsuariosTable />
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
                  onClick: () => console.log("Buscar"),
                },
              ]}
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>Aca ira el modulo de busqueda avanzada...</p>
            </Box>
          </Box>
        );

      case "agregar-usuario":
        return (
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            <ContentHeader
              title="Agregar Usuario"
              description="Completa los datos para registrar un nuevo usuario en el sistema."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>Formulario de creacion de usuario.</p>
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
        <SidebarDrawer
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
    </Box>
  );
}