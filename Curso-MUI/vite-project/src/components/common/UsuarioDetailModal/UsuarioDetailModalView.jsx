import React from 'react';
import {
  IconButton,
  Box,
  Typography,
  Chip,
  Fade,
  CircularProgress,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Shield as ShieldIcon,
  Security as SecurityIcon,
  Event as CalendarIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import {
  StyledDialog,
  StyledDialogTitle,
  HeaderContent,
  HeaderIcon,
  SectionCard,
  SectionHeader,
  SectionContent,
  InfoRow,
  LoadingContainer,
  ErrorContainer,
  ErrorIconBox,
  StyledDialogContent,
} from './UsuarioDetailModal.styles';

const InfoField = ({ label, value, type = 'text' }) => {
  let displayValue = value;
  let chipColor = 'primary';

  switch (type) {
    case 'boolean':
      displayValue = value ? 'SI' : 'NO';
      chipColor = value ? 'success' : 'default';
      break;
    default:
      displayValue = value || 'No especificado';
  }

  return (
    <InfoRow>
      <Typography
        sx={{
          color: '#475569',
          fontSize: {
            xs: '0.65rem',
            md: '0.7rem',
            lg: '0.75rem',
            xl: '0.8rem',
          },
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          minWidth: {
            xs: '90px',
            md: '110px',
            lg: '120px',
          },
        }}
      >
        {label}
      </Typography>
      {type === 'boolean' ? (
        <Chip
          label={displayValue}
          size="small"
          color={chipColor}
          variant="filled"
          sx={{
            height: '26px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
            marginLeft: 'auto',
          }}
        />
      ) : (
        <Typography
          sx={{
            color: '#0F172A',
            fontSize: {
              xs: '0.75rem',
              md: '0.8rem',
              lg: '0.85rem',
              xl: '0.9rem',
            },
            fontWeight: 600,
            textAlign: 'right',
            maxWidth: '65%',
            wordBreak: 'break-word',
            marginLeft: 'auto',
          }}
        >
          {displayValue}
        </Typography>
      )}
    </InfoRow>
  );
};

const UsuarioDetailModalView = ({
  open,
  isClosing,
  onClose,
  usuario,
  loading = false,
  error = null,
  onRefresh,
}) => {
  const renderLoading = () => (
    <LoadingContainer>
      <CircularProgress
        size={64}
        thickness={2.5}
        sx={{
          color: '#3B82F6',
        }}
      />
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
          color: '#64748B',
          textAlign: 'center',
        }}
      >
        Cargando información del usuario...
      </Typography>
    </LoadingContainer>
  );

  const renderError = () => (
    <ErrorContainer>
      <ErrorIconBox>!</ErrorIconBox>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            color: '#DC2626',
            fontWeight: 800,
            mb: 1,
            fontSize: '1.1rem',
          }}
        >
          Error al cargar los datos
        </Typography>
        <Typography
          sx={{
            color: '#991B1B',
            mb: 2,
            fontSize: '0.9rem',
            lineHeight: 1.6,
          }}
        >
          {error || 'Ha ocurrido un error inesperado'}
        </Typography>
        {onRefresh && (
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
            sx={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
              color: 'white',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
              padding: '8px 24px',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Reintentar
          </Button>
        )}
      </Box>
    </ErrorContainer>
  );

  const renderContent = () => {
    if (loading) return renderLoading();
    if (error) return renderError();
    if (!usuario) return null;

    const sections = [
      {
        title: 'Datos Personales',
        icon: <PersonIcon sx={{ fontSize: '22px' }} />,
        color: '#3B82F6',
        fields: [
          { label: 'Matricula de Revista', value: usuario.matriculaRevista },
          { label: 'Apellido', value: usuario.apellido },
          { label: 'Nombre', value: usuario.nombre },
        ],
      },
      {
        title: 'Informacion Militar',
        icon: <ShieldIcon sx={{ fontSize: '22px' }} />,
        color: '#059669',
        fields: [
          { label: 'Jerarquia', value: usuario.jerarquia || 'N/A' },
          { label: 'Destino', value: usuario.destino || 'N/A' },
        ],
      },
      {
        title: 'Nivel y Permisos',
        icon: <SecurityIcon sx={{ fontSize: '22px' }} />,
        color: '#DC2626',
        fields: [
          { label: 'Nivel', value: usuario.nivel || 'N/A' },
          { label: 'Tipo Clasificación', value: usuario.tipoClasificacion || 'N/A' },
          {
            label: 'Justicia',
            value: usuario.justicia || false,
            type: 'boolean',
          },
          
          {
            label: 'Confianza',
            value: usuario.confianza || false,
            type: 'boolean',
          },
          {
            label: 'Super Confianza',
            value: usuario.superConfianza || false,
            type: 'boolean',
          },
          
        ],
      },
      {
        title: 'Datos de Acceso',
        icon: <CalendarIcon sx={{ fontSize: '22px' }} />,
        color: '#7C3AED',
        fields: [
          { label: 'Usuario', value: usuario.logon || 'N/A' },
          {
            label: 'Fecha de Creacion',
            value: usuario.fechaCreacion
              ? new Date(usuario.fechaCreacion).toLocaleString('es-AR')
              : 'No disponible',
          },
        ],
      },
    ];

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: '1fr 1fr',
          },
          gap: {
            xs: '12px',
            md: '14px',
            lg: '16px',
          },
          mt: 0,
        }}
      >
        {sections.map((section, i) => (
          <SectionCard key={i} elevation={0}>
            <SectionHeader>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: {
                    xs: '32px',
                    md: '36px',
                    lg: '38px',
                    xl: '42px',
                  },
                  height: {
                    xs: '32px',
                    md: '36px',
                    lg: '38px',
                    xl: '42px',
                  },
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, ${section.color}15 0%, ${section.color}08 100%)`,
                  color: section.color,
                  border: `1px solid ${section.color}25`,
                }}
              >
                {section.icon}
              </Box>
              <Typography
                sx={{
                  color: '#0F172A',
                  fontWeight: 700,
                  fontSize: {
                    xs: '0.75rem',
                    md: '0.8rem',
                    lg: '0.85rem',
                    xl: '0.9rem',
                  },
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {section.title}
              </Typography>
            </SectionHeader>
            <SectionContent>
              {section.fields.map((f, j) => (
                <InfoField key={j} {...f} />
              ))}
            </SectionContent>
          </SectionCard>
        ))}
      </Box>
    );
  };

  return (
    <StyledDialog
      open={open && !isClosing}
      onClose={onClose}
      TransitionComponent={Fade}
      transitionDuration={400}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '80vh',
          maxWidth: {
            xs: '95vw',
            sm: '90vw',
            md: '700px',
            lg: '800px',
            xl: '900px',
          },
        },
      }}
    >
      <StyledDialogTitle>
        <HeaderContent>
          <HeaderIcon>
            <PersonIcon sx={{ fontSize: '28px' }} />
          </HeaderIcon>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: {
                  xs: '0.95rem',
                  md: '1.05rem',
                  lg: '1.15rem',
                  xl: '1.2rem',
                },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                letterSpacing: '-0.3px',
              }}
            >
              {usuario ? `${usuario.apellido}, ${usuario.nombre}` : 'Cargando...'}
            </Typography>
          </Box>
        </HeaderContent>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'rgba(248, 250, 252, 0.8)',
            width: '44px',
            height: '44px',
            '&:hover': {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
        >
          <CloseIcon sx={{ fontSize: '24px' }} />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        {renderContent()}
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default UsuarioDetailModalView;