// src/components/layout/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  Collapse,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme'; // 🔹 Se importa tu tema global
import {
  SidebarContainer,
  SidebarHeader,
  StyledListItemButton,
  ItemIcon,
  SectionHeader,
  ScrollableContent,
} from './Sidebar.styles';
import { useSidebar } from './useSidebar';

/**
 * Componente Sidebar profesional con diseño moderno
 * @param {Array} sections - Secciones del sidebar con items
 * @param {String} activeSection - ID de la sección activa
 * @param {Function} onSectionChange - Callback al cambiar de sección
 * @param {String} titulo - Título del sidebar
 * @param {Object} logo - Logo del sidebar (componente Material-UI)
 * @param {Boolean} open - Estado de apertura del sidebar (desde DashboardLayout)
 * @param {Function} onToggle - Callback para toggle del sidebar
 * @param {Function} onCollapsedChange - Callback cuando cambia el estado collapsed
 */
export default function Sidebar({ 
  sections = [], 
  activeSection = '', 
  onSectionChange = () => {},
  titulo = 'MINIDOC',
  logo = null,
  open = true,
  onToggle = () => {},
  onCollapsedChange = () => {},
}) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapsedChange(newCollapsed);
  };

  // Usar el hook personalizado
  const { expandido, alternarSeccion, manejarClick } = useSidebar(
    sections,
    onSectionChange,
    () => {}
  );

  return (
    <ThemeProvider theme={theme}>
      <SidebarContainer collapsed={collapsed}>
        {/* Header */}
        <SidebarHeader collapsed={collapsed}>
          <Box
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              position: 'relative',
              zIndex: 1,
              width: '100%',
            }}
          >
            {!collapsed && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {logo && (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      backgroundColor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    {React.cloneElement(logo, { 
                      sx: { color: '#FFFFFF', fontSize: 24 } 
                    })}
                  </Box>
                )}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: theme.palette.primary.contrastText,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    fontSize: '1.25rem',
                  }}
                >
                  {titulo}
                </Typography>
              </Box>
            )}
            
            <Tooltip title={collapsed ? "Expandir" : "Colapsar"} placement="right">
              <IconButton
                onClick={handleToggleCollapsed}
                size="small"
                sx={{
                  color: theme.palette.secondary.contrastText,
                  '&:hover': { 
                    backgroundColor: theme.palette.action.hover,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </SidebarHeader>

        {/* Contenido con scroll */}
        <ScrollableContent>
          {sections.map((section, index) => (
            <Box key={section.id}>
              <SectionHeader
                collapsed={collapsed}
                expanded={expandido[section.id]}
                onClick={() => !collapsed && alternarSeccion(section.id)}
              >
                {!collapsed && (
                  <>
                    <Typography className="section-title">
                      {section.title}
                    </Typography>
                    <IconButton size="small">
                      <ExpandLessIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </SectionHeader>

              <Collapse in={collapsed || expandido[section.id]} timeout={300}>
                <List disablePadding>
                  {section.items.map((item) => (
                    <Tooltip 
                      key={item.id} 
                      title={collapsed ? item.text : ""} 
                      placement="right"
                      arrow
                    >
                      <Box>
                        <StyledListItemButton
                          isActive={activeSection === item.id}
                          onClick={() => manejarClick(item.id)}
                          collapsed={collapsed}
                        >
                          <ItemIcon isActive={activeSection === item.id}>
                            {item.icon}
                          </ItemIcon>
                          
                          {!collapsed && (
                            <>
                              <Typography
                                sx={{
                                  fontSize: '0.875rem',
                                  fontWeight: activeSection === item.id ? 600 : 500,
                                  color: activeSection === item.id 
                                    ? theme.palette.secondary.contrastText 
                                    : theme.palette.text.primary,
                                  flex: 1,
                                  transition: 'color 0.2s ease',
                                }}
                              >
                                {item.text}
                              </Typography>
                              
                              {item.badge && (
                                <Chip
                                  label={item.badge}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: '0.6875rem',
                                    fontWeight: 600,
                                    backgroundColor: activeSection === item.id 
                                      ? theme.palette.primary.light 
                                      : theme.palette.background.paper,
                                    color: activeSection === item.id 
                                      ? theme.palette.primary.contrastText 
                                      : theme.palette.primary.main,
                                    border: activeSection === item.id 
                                      ? '1px solid rgba(0,0,0,0.1)' 
                                      : 'none',
                                    transition: 'all 0.2s ease',
                                  }}
                                />
                              )}
                            </>
                          )}
                        </StyledListItemButton>
                      </Box>
                    </Tooltip>
                  ))}
                </List>
              </Collapse>

              {index < sections.length - 1 && !collapsed && (
                <Divider 
                  sx={{ 
                    my: 2, 
                    mx: 3,
                    opacity: 0.1,
                  }} 
                />
              )}
            </Box>
          ))}
        </ScrollableContent>
      </SidebarContainer>
    </ThemeProvider>
  );
}
