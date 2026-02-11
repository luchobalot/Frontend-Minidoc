import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: '32px 48px 24px',
  background: `linear-gradient(180deg, transparent 0%, ${theme.palette.background.paper} 100%)`,
  borderTop: `1px solid ${theme.palette.divider}`,
  
  [theme.breakpoints.down('md')]: {
    padding: '24px 16px 20px',
  },
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: '12px',
  },
}));

const FooterSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateY(-1px)',
  },

  '& .MuiSvgIcon-root': {
    fontSize: '18px',
  },
}));

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <InfoOutlinedIcon 
            sx={(theme) => ({ 
              fontSize: '18px', 
              color: theme.palette.text.secondary 
            })} 
          />
          <Typography 
            variant="body2" 
            sx={(theme) => ({ 
              color: theme.palette.text.secondary 
            })}
          >
            MINIDOC v1.0.0 | {currentYear}
          </Typography>
        </FooterSection>

        <FooterSection sx={{ gap: '20px' }}>
          <FooterLink href="#" onClick={(e) => e.preventDefault()}>
            <SupportAgentIcon />
            Soporte
          </FooterLink>
          
          <Divider 
            orientation="vertical" 
            flexItem 
            sx={{ 
              display: { xs: 'none', sm: 'block' } 
            }} 
          />
          
          <FooterLink href="#" onClick={(e) => e.preventDefault()}>
            <EmailIcon />
            Contacto
          </FooterLink>
        </FooterSection>

        <Typography 
          variant="caption" 
          sx={(theme) => ({ 
            color: theme.palette.text.disabled 
          })}
        >
          Servicio de Analisis Operativo, Armas y Guerra Electronica
        </Typography>
      </FooterContent>
    </FooterContainer>
  );
};

export default DashboardFooter;