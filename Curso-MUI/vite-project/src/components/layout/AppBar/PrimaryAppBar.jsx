import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Grow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

const UserProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.2),
  padding: theme.spacing(1),
  borderRadius: 10,
  cursor: 'default',
}));

export default function PrimaryAppBar({
  activeSection,
  onSectionChange,
  onMenuClick,
  sidebarOpen,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(8, 17, 40, 0.96)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        zIndex: 1100,
        width: '100%',
        left: 0,
      }}
    >
      <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* Menu hamburguesa - solo visible cuando sidebar cerrado */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!sidebarOpen && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onMenuClick}
              sx={{ 
                color: '#FFFFFF', 
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          )}
        </Box>

        {/* Iconos a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
          <Tooltip title="Notificaciones">
            <IconButton
              sx={{
                color: '#FFFFFF',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <NotificationsIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Mi cuenta">
            <IconButton onClick={handleMenuOpen} sx={{ color: '#FFFFFF' }}>
              <AccountCircleIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          {/* Menu desplegable */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            TransitionComponent={Grow}
            transitionDuration={250}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                p: 0.8,
                borderRadius: 2,
                minWidth: 210,
                background: 'rgba(8, 17, 40, 0.96)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              },
            }}
          >
            {/* Perfil dentro del menu */}
            <UserProfile>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: 'linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                LB
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  fontSize="0.9rem"
                  letterSpacing="0.02em"
                  sx={{ color: '#FFFFFF' }}
                >
                  <Box component="span" sx={{ color: '#93C5FD' }}>MI</Box> BALOT LUCIANO
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}
                >
                  @luchobalot
                </Typography>
              </Box>
            </UserProfile>

            <Divider sx={{ my: 0.8, backgroundColor: 'rgba(255,255,255,0.08)' }} />

            <MenuItem
              onClick={() => console.log('Editar perfil')}
              sx={{
                py: 0.7,
                borderRadius: 10,
                fontSize: '0.85rem',
                '& svg': { fontSize: 18, color: '#FFFFFF' },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(3px)',
                },
              }}
            >
              <EditIcon sx={{ mr: 1 }} />
              Editar perfil
            </MenuItem>

            <MenuItem
              onClick={() => console.log('Preferencias')}
              sx={{
                py: 0.7,
                borderRadius: 10,
                fontSize: '0.85rem',
                '& svg': { fontSize: 18, color: '#FFFFFF' },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(3px)',
                },
              }}
            >
              <SettingsIcon sx={{ mr: 1 }} />
              Preferencias
            </MenuItem>

            <Divider sx={{ my: 0.8, backgroundColor: 'rgba(255,255,255,0.08)' }} />

            <MenuItem
              onClick={() => console.log('Cerrar sesion')}
              sx={{
                py: 0.7,
                borderRadius: 10,
                fontSize: '0.85rem',
                '& svg': { fontSize: 18, color: '#FFFFFF' },
                '&:hover': {
                  backgroundColor: 'rgba(239,68,68,0.2)',
                  transform: 'translateX(3px)',
                },
              }}
            >
              <LogoutIcon sx={{ mr: 1 }} />
              Cerrar sesion
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}