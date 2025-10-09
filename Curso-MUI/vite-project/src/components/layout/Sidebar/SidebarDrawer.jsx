// src/components/layout/Sidebar/SidebarDrawer.jsx
import React from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import SidebarList from './SidebarList';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100vh',
  background: 'rgba(8, 17, 40, 0.96)', // ðŸ’  mismo tono que el AppBar
  backdropFilter: 'blur(10px)',
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  borderRight: '1px solid rgba(255,255,255,0.08)',
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default function SidebarDrawer({ open, onClose, sections, activeSection, onSectionChange }) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          width: 280,
          border: 'none',
        },
      }}
    >
      <SidebarContainer>
        {/* Header */}
        <SidebarHeader>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#FFFFFF', letterSpacing: '0.05em' }}>
            MINIDOC
          </Typography>
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
          onClose={() => {}}
        />
      </SidebarContainer>
    </Drawer>
  );
}