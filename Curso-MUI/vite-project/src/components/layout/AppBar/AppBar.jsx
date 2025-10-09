import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

// IMPORT CORRECTOS del sidebar modular
import SidebarDrawer from '../Sidebar/SidebarDrawer';
import { sidebarUsuarios } from '../Sidebar/configs/sidebarUsuarios';

export default function PrimaryAppBar({ activeSection, onSectionChange }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Box sx={{ width: '100vw', margin: 0, padding: 0 }}>
      <AppBar position="fixed" sx={{ width: '100vw', left: 0, right: 0 }}>
        <Toolbar>
          {/* BotÃ³n para abrir/cerrar sidebar */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MINIDOC
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Icono de usuario */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" edge="end" aria-label="account" color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar modular */}
      <SidebarDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        sections={sidebarUsuarios}               // <<== nuevo: le pasamos la config
        activeSection={activeSection}
        onSectionChange={onSectionChange}       // sigue funcionando con scroll suave
      />
    </Box>
  );
}