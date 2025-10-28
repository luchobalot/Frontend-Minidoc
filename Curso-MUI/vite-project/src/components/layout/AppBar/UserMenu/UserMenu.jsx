import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Grow,
  Menu,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserProfile, StyledMenuItem, LogoutMenuItem } from "../AppBar.styles";
import { useUserMenu } from "./useUserMenu";

/**
 *
 * @param {object} props
 * @param {object} [props.user] - Datos del usuario
 * @param {function} [props.onLogout] - Callback de logout
 * @param {function} [props.onNavigateLogout] - Callback opcional post logout
 * @param {Array} [props.customItems] - Ãtems extra personalizados [{ icon, label, onClick }]
 * @param {boolean} [props.disableDefaultItems] - Si true, oculta Ã­tems por defecto
 */
export default function UserMenu({
  user,
  onLogout,
  onNavigateLogout,
  customItems = [],
  disableDefaultItems = false,
}) {
  const {
    user: usuario,
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleLogout,
  } = useUserMenu({ user, onLogout, onNavigateLogout });

  const obtenerIniciales = () => {
    if (usuario?.firstName && usuario?.lastName) {
      return `${usuario.firstName.charAt(0)}${usuario.lastName.charAt(0)}`.toUpperCase();
    }
    return "U";
  };

  const obtenerNombreCompleto = () => usuario?.lastName || "USUARIO";
  const obtenerNombreUsuario = () => usuario?.logon ? `@${usuario.logon}` : "@usuario";
  const obtenerRango = () => usuario?.rank || null;

  return (
    <>
      <Tooltip title="Mi cuenta">
        <IconButton
          onClick={handleOpen}
          sx={{
            color: "inherit",
            p: 0.6,
            "&:hover": {
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <AccountCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        transitionDuration={250}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 0.8,
            borderRadius: 2,
            minWidth: 210,
            background: (theme) => alpha(theme.palette.background.paper, 0.96),
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.common.white, 0.1),
            color: "text.primary",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            overflow: "hidden",
          },
        }}
      >
        <UserProfile>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: "1rem",
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.common.white, 0.2),
            }}
          >
            {obtenerIniciales()}
          </Avatar>
          <Box>
            <Typography
              variant="body2"
              fontWeight={700}
              fontSize="0.9rem"
              letterSpacing="0.02em"
              sx={{ color: "text.primary" }}
            >
              {obtenerRango() && (
                <Box component="span" sx={{ color: "secondary.light" }}>
                  {obtenerRango()}{" "}
                </Box>
              )}
              {obtenerNombreCompleto()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => alpha(theme.palette.text.primary, 0.6),
                fontSize: "0.75rem",
              }}
            >
              {obtenerNombreUsuario()}
            </Typography>
          </Box>
        </UserProfile>

        <Divider sx={{ my: 0.8, backgroundColor: (t) => alpha(t.palette.common.white, 0.08) }} />

        {!disableDefaultItems && [
          <StyledMenuItem key="edit" onClick={() => console.log("Editar perfil")}>
            <EditIcon /> Editar perfil
          </StyledMenuItem>,

          <StyledMenuItem key="settings" onClick={() => console.log("Preferencias")}>
            <SettingsIcon /> Preferencias
          </StyledMenuItem>,

          <Divider key="divider" sx={{ my: 0.8, backgroundColor: (t) => alpha(t.palette.common.white, 0.08) }} />,

          <LogoutMenuItem key="logout" onClick={handleLogout}>
            <LogoutIcon /> Cerrar sesión
          </LogoutMenuItem>
        ]}

        {customItems.length > 0 && [
          !disableDefaultItems && (
            <Divider key="divider-custom" sx={{ my: 0.8, backgroundColor: (t) => alpha(t.palette.common.white, 0.08) }} />
          ),
          ...customItems.map((item, i) => (
            <StyledMenuItem key={i} onClick={item.onClick}>
              {item.icon} {item.label}
            </StyledMenuItem>
          ))
        ]}
      </Menu>
    </>
  );
}