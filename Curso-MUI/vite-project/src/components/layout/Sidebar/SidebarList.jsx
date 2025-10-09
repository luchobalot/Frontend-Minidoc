// src/components/layout/Sidebar/SidebarList.jsx
import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/material/styles';

const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  zIndex: 1,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
  },
});

const StyledListItemButton = styled(ListItemButton)(({ isActive }) => ({
  margin: '4px 16px',
  borderRadius: 10,
  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
  borderLeft: isActive ? '3px solid #3B82F6' : '3px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(4px)',
  },
}));

export default function SidebarList({ sections, activeSection, onSectionChange, onClose }) {
  const [expanded, setExpanded] = useState(
    sections.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );

  const toggleSection = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleClick = (id) => {
    onSectionChange(id); // âœ… dispara el scroll desde PagesTest
    if (window.innerWidth < 900) onClose();
  };

  return (
    <>
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
    </>
  );
}