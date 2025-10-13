import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarList from './SidebarList';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100vh',
  background: 'rgba(8, 17, 40, 0.96)',
  backdropFilter: 'blur(10px)',
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  borderRight: '1px solid rgba(255,255,255,0.08)',
  paddingTop: 0,
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
  minHeight: '64px',
  maxHeight: '64px',
  boxSizing: 'border-box',
  position: 'relative',
}));

export default function SidebarDrawer({ 
  open, 
  onClose, 
  onToggle,
  sections, 
  activeSection, 
  onSectionChange,
  variant = 'persistent'
}) {
  return (
    <SidebarContainer>
      {/* Header */}
      <SidebarHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            sx={{ 
              color: '#FFFFFF', 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              ml: -1,
            }}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
          
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
      <SidebarList
        sections={sections}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        onClose={onClose}
      />
    </SidebarContainer>
  );
}