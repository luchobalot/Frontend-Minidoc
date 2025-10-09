import React, { useState } from 'react';
import { Box } from "@mui/material";
import AppBar from "../../components/layout/AppBar/PrimaryAppBar";
import SidebarDrawer from "../../components/layout/Sidebar/SidebarDrawer";
import { sidebarUsuarios } from "../../components/layout/Sidebar/configs/sidebarUsuarios";
import UsuariosTable from "../../components/tables/UsuariosTable";
import ContentHeader from "../../components/common/ContentHeader/ContentHeader";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

export default function PagesTest() {
  const [activeSection, setActiveSection] = useState("listado-general");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // === Contenido dinÃ¡mico segÃºn secciÃ³n activa ===
  const renderContent = () => {
    switch (activeSection) {
      case "listado-general":
        return (
          <>
            <ContentHeader
              title="Listado General de Usuarios"
              description="VisualizÃ¡ todos los usuarios registrados en el sistema MINIDOC."
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
          </>
        );

      case "busqueda-avanzada":
        return (
          <>
            <ContentHeader
              title="BÃºsqueda Avanzada"
              description="BuscÃ¡ usuarios por mÃºltiples criterios de filtrado."
              actions={[
                {
                  label: "Buscar",
                  icon: <SearchIcon />,
                  onClick: () => console.log("Buscar"),
                },
              ]}
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>AcÃ¡ irÃ¡ el mÃ³dulo de bÃºsqueda avanzada...</p>
            </Box>
          </>
        );

      case "agregar-usuario":
        return (
          <>
            <ContentHeader
              title="Agregar Usuario"
              description="CompletÃ¡ los datos para registrar un nuevo usuario en el sistema."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>Formulario de creaciÃ³n de usuario.</p>
            </Box>
          </>
        );

      case "modificar-usuario":
        return (
          <>
            <ContentHeader
              title="Modificar Usuario"
              description="SeleccionÃ¡ un usuario existente y actualizÃ¡ su informaciÃ³n."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>Formulario de ediciÃ³n de usuario.</p>
            </Box>
          </>
        );

      default:
        return (
          <>
            <ContentHeader
              title="SecciÃ³n no encontrada"
              description="SeleccionÃ¡ una opciÃ³n vÃ¡lida en el menÃº lateral."
            />
            <Box sx={{ p: 3, color: "#E2E8F0" }}>
              <p>No hay contenido disponible.</p>
            </Box>
          </>
        );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F1F5F9" }}>
      {/* AppBar */}
      <AppBar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        pageTitle="GestiÃ³n de Usuarios"
      />

      {/* Sidebar */}
      <SidebarDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sections={sidebarUsuarios}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Contenido dinÃ¡mico segÃºn la secciÃ³n */}
      <Box sx={{ mt: 12, px: 4 }}>{renderContent()}</Box>
    </Box>
  );
}