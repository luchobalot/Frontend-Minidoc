import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SidebarContainer, SidebarHeader, ScrollableContent, StyledListItemButton } from './Sidebar.styles';
import { useSidebar } from './useSidebar';

export default function Sidebar({ 
  open, 
  onClose, 
  onToggle,
  sections, 
  activeSection, 
  onSectionChange,
  titulo = 'MINIDOC',
  logo = null,
  mostrarBotonCerrar = true,
  ancho = 280,
  contenidoHeader = null,
}) {
  const { expandido, alternarSeccion, manejarClick } = useSidebar(sections, onSectionChange, onClose);

  return (
    <SidebarContainer sx={{ width: ancho }}>
      {/* Encabezado */}
      <SidebarHeader>
        {contenidoHeader ? (
          contenidoHeader
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {logo && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {logo}
              </Box>
            )}
            <Typography 
              variant="h6" 
              fontWeight={700} 
              sx={{ color: '#FFFFFF', letterSpacing: '0.05em' }}
            >
              {titulo}
            </Typography>
          </Box>
        )}
        
        {mostrarBotonCerrar && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </SidebarHeader>

      {/* Lista del sidebar */}
      <ScrollableContent>
        {sections.map((seccion, indice) => (
          <Box key={seccion.id}>
            <Box
              display="flex"
              justifyContent="space-between"
              onClick={() => alternarSeccion(seccion.id)}
              sx={{ cursor: 'pointer', px: 2, py: 1, userSelect: 'none' }}
            >
              <ListItemText
                primary={seccion.title}
                primaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              />
              <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                {expandido[seccion.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={expandido[seccion.id]}>
              <List disablePadding>
                {seccion.items.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <StyledListItemButton
                      isActive={activeSection === item.id}
                      onClick={() => manejarClick(item.id)}
                    >
                      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: activeSection === item.id ? 600 : 500,
                        }}
                      />
                    </StyledListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {indice < sections.length - 1 && <Divider sx={{ my: 1, opacity: 0.1 }} />}
          </Box>
        ))}
      </ScrollableContent>
    </SidebarContainer>
  );
}