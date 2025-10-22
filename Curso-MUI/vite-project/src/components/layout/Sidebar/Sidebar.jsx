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
  variant = 'persistent'
}) {
  const { expanded, toggleSection, handleClick } = useSidebar(sections, onSectionChange, onClose);

  return (
    <SidebarContainer>
      {/* Header */}
      <SidebarHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{ color: '#FFFFFF', letterSpacing: '0.05em' }}
          >
            MINIDOC
          </Typography>
        </Box>
        
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
      </SidebarHeader>

      {/* Lista del sidebar */}
      <ScrollableContent>
        {sections.map((section, idx) => (
          <Box key={section.id}>
            <Box
              display="flex"
              justifyContent="space-between"
              onClick={() => toggleSection(section.id)}
              sx={{ cursor: 'pointer', px: 2, py: 1, userSelect: 'none' }}
            >
              <ListItemText
                primary={section.title}
                primaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              />
              <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                {expanded[section.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={expanded[section.id]}>
              <List disablePadding>
                {section.items.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <StyledListItemButton
                      isActive={activeSection === item.id}
                      onClick={() => handleClick(item.id)}
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

            {idx < sections.length - 1 && <Divider sx={{ my: 1, opacity: 0.1 }} />}
          </Box>
        ))}
      </ScrollableContent>
    </SidebarContainer>
  );
}