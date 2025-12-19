// src/components/layout/AppBar/UserMenu/UserMenu.jsx
import React from "react";
import {
  Box,
  Grow,
  Typography,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useUserMenu } from "./useUserMenu";
import { 
  StyledMenuLayout, 
  UserProfile, 
  StyledAvatar, 
  UserInfo,
  MenuSection,
  StyledMenuItem, 
  LogoutMenuItem,
  StyledDivider,
} from "./UserMenu.styles";

export default function UserMenu({
  user,
  onLogout,
  onNavigateLogout,
  customItems = [],
  disableDefaultItems = false,
}) {
  const {
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleLogout,
    handleEditarPerfil,
    handlePreferencias,
    userInfo
  } = useUserMenu({ user, onLogout, onNavigateLogout });

  return (
    <>
      <Tooltip title="Mi cuenta" placement="bottom">
        <IconButton
          onClick={handleOpen}
          sx={{
            color: "text.primary",
            p: 0.75,
            borderRadius: 2,
            border: '1px solid',
            borderColor: open ? 'primary.main' : 'transparent',
            backgroundColor: open ? alpha('#3B82F6', 0.04) : 'transparent',
            transition: 'all 0.2s ease',
            "&:hover": {
              backgroundColor: alpha('#3B82F6', 0.06),
              borderColor: alpha('#3B82F6', 0.3),
            },
          }}
        >
          <AccountCircleIcon 
            fontSize="medium" 
            sx={{ 
              color: open ? 'primary.main' : 'text.secondary',
              transition: 'color 0.2s ease',
            }} 
          />
          <KeyboardArrowDownIcon 
            fontSize="small"
            sx={{
              ml: 0.5,
              color: open ? 'primary.main' : 'text.secondary',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'all 0.2s ease',
            }}
          />
        </IconButton>
      </Tooltip>

      <StyledMenuLayout
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        transitionDuration={200}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Header con información del usuario */}
        <UserProfile>
          <StyledAvatar>
            {userInfo.iniciales}
          </StyledAvatar>
          <UserInfo>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body1"
                fontWeight={600}
                fontSize="0.95rem"
                sx={{ 
                  color: "text.primary",
                  lineHeight: 1.3,
                }}
              >
                {userInfo.nombreCompleto}
              </Typography>
              {userInfo.rango && (
                <Chip
                  label={userInfo.rango}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                  }}
                />
              )}
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              {userInfo.nombreUsuario}
            </Typography>
          </UserInfo>
        </UserProfile>

        {/* Sección de opciones principales */}
        {!disableDefaultItems && (
          <MenuSection>
            <StyledMenuItem onClick={handleEditarPerfil}>
              <EditIcon />
              Editar perfil
            </StyledMenuItem>

            <StyledMenuItem onClick={handlePreferencias}>
              <SettingsIcon />
              Preferencias
            </StyledMenuItem>
          </MenuSection>
        )}

        {/* Items personalizados */}
        {customItems.length > 0 && (
          <>
            <StyledDivider />
            <MenuSection>
              {customItems.map((item, i) => (
                <StyledMenuItem key={i} onClick={item.onClick}>
                  {item.icon}
                  {item.label}
                </StyledMenuItem>
              ))}
            </MenuSection>
          </>
        )}

        {/* Sección de cerrar sesión */}
        {!disableDefaultItems && (
          <>
            <StyledDivider />
            <MenuSection>
              <LogoutMenuItem onClick={handleLogout}>
                <LogoutIcon />
                Cerrar sesión
              </LogoutMenuItem>
            </MenuSection>
          </>
        )}
      </StyledMenuLayout>
    </>
  );
}