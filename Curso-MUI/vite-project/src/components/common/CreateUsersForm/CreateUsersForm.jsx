import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  Switch,
  FormControlLabel,
  Grid,
  Paper,
  styled
} from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: '#0F172A',
  borderRadius: '12px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  overflow: 'hidden',
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  background: 'rgba(30, 58, 138, 0.3)',
  padding: '20px 30px',
  borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
  '& .MuiStepLabel-label': {
    color: '#E2E8F0',
    fontSize: '12px',
    fontWeight: 500,
  },
  '& .MuiStepLabel-label.Mui-active': {
    color: '#FFFFFF',
    fontWeight: 600,
  },
  '& .MuiStepLabel-label.Mui-completed': {
    color: '#60A5FA',
  },
  '& .MuiStepIcon-root': {
    color: 'rgba(59, 130, 246, 0.2)',
    '& .MuiStepIcon-text': {
      fill: '#E2E8F0',
    },
  },
  '& .MuiStepIcon-root.Mui-active': {
    color: '#3B82F6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
    '& .MuiStepIcon-text': {
      fill: '#FFFFFF',
    },
  },
  '& .MuiStepIcon-root.Mui-completed': {
    color: '#10B981',
  },
  '& .MuiStepConnector-line': {
    borderColor: 'rgba(59, 130, 246, 0.2)',
    borderTopWidth: '2px',
  },
  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
    borderColor: '#3B82F6',
  },
  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
    borderColor: '#10B981',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    background: 'rgba(15, 35, 70, 0.8)',
    color: '#FFFFFF',
    borderRadius: '6px',
    minHeight: '56px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderWidth: '1px',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#3B82F6',
    borderWidth: '1px',
  },
  '& .MuiInputLabel-root': {
    color: '#94A3B8',
    fontWeight: 400,
    fontSize: '15px',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#94A3B8',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#64748B',
    opacity: 1,
  },
  '& .MuiInputBase-input': {
    padding: '16px 15px',
    fontSize: '15px',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  background: 'rgba(15, 35, 70, 0.8)',
  color: '#FFFFFF',
  borderRadius: '6px',
  minHeight: '56px',
  fontSize: '15px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderWidth: '1px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#3B82F6',
    borderWidth: '1px',
  },
  '& .MuiSelect-select': {
    padding: '16px 15px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiSelect-icon': {
    color: '#94A3B8',
  },
  '& .MuiSelect-select:focus': {
    backgroundColor: 'transparent',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: '#94A3B8',
    fontWeight: 400,
    fontSize: '15px',
    transform: 'translate(0, -24px) scale(1)',
    position: 'relative',
    '&.Mui-focused': {
      color: '#94A3B8',
    },
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  color: '#E2E8F0',
  fontWeight: 600,
  fontSize: '14px',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  background: '#1E293B',
  color: '#E2E8F0',
  fontSize: '15px',
  padding: '12px 16px',
  '&:hover': {
    background: 'rgba(59, 130, 246, 0.15)',
  },
  '&.Mui-selected': {
    background: 'rgba(59, 130, 246, 0.25)',
    '&:hover': {
      background: 'rgba(59, 130, 246, 0.35)',
    },
  },
}));

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  background: 'rgba(15, 35, 70, 0.6)',
  borderRadius: '6px',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  justifyContent: 'space-between',
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: '#64748B',
    '&.Mui-checked': {
      color: '#3B82F6',
      '& + .MuiSwitch-track': {
        backgroundColor: '#3B82F6',
        opacity: 0.5,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#475569',
    opacity: 0.5,
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  color: 'white',
  padding: '14px 32px',
  borderRadius: '6px',
  fontSize: '15px',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '140px',
  '&:hover': {
    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#E2E8F0',
  border: '1px solid rgba(59, 130, 246, 0.4)',
  padding: '14px 32px',
  borderRadius: '6px',
  fontSize: '15px',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '140px',
  '&:hover': {
    background: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.6)',
  },
}));

const SuccessButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  color: 'white',
  padding: '14px 32px',
  borderRadius: '6px',
  fontSize: '15px',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '140px',
  '&:hover': {
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  color: '#FFFFFF',
  marginBottom: '30px',
  paddingBottom: '12px',
  borderBottom: '2px solid #3B82F6',
  fontWeight: 600,
}));

const ConfirmationCard = styled(Box)(({ theme }) => ({
  background: 'rgba(15, 35, 70, 0.6)',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  borderLeft: '4px solid #3B82F6',
  border: '1px solid rgba(59, 130, 246, 0.3)',
}));

const CreateUsersForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    matricula: '',
    jerarquia: '',
    destino: '',
    cuerpo: '',
    escalafon: '',
    nivel: '',
    tipoClasificacion: '',
    confianza: false,
    superconfianza: false,
    usuario: '',
    contrasena: '',
    confirmarContrasena: '',
  });

  const steps = [
    'Datos Personales',
    'Informacion Militar',
    'Clasificacion',
    'Datos de Acceso',
    'Confirmacion',
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    alert('Usuario creado exitosamente');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <SectionTitle>Datos Personales</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Nombre <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Apellido <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese el apellido"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Matricula de Revista <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleChange}
                  placeholder="Ingrese la matricula de revista"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <SectionTitle>Informacion Militar</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Jerarquia <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledFormControl fullWidth>
                  <StyledSelect
                    name="jerarquia"
                    value={formData.jerarquia}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <StyledMenuItem value="" disabled>
                      Seleccione una jerarquia
                    </StyledMenuItem>
                    <StyledMenuItem value="soldado">Soldado</StyledMenuItem>
                    <StyledMenuItem value="cabo">Cabo</StyledMenuItem>
                    <StyledMenuItem value="sargento">Sargento</StyledMenuItem>
                    <StyledMenuItem value="teniente">Teniente</StyledMenuItem>
                    <StyledMenuItem value="capitan">Capitan</StyledMenuItem>
                    <StyledMenuItem value="mayor">Mayor</StyledMenuItem>
                    <StyledMenuItem value="coronel">Coronel</StyledMenuItem>
                    <StyledMenuItem value="general">General</StyledMenuItem>
                  </StyledSelect>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Destino <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  name="destino"
                  value={formData.destino}
                  onChange={handleChange}
                  placeholder="Ingrese el destino"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>Cuerpo</FieldLabel>
                <StyledFormControl fullWidth>
                  <StyledSelect
                    name="cuerpo"
                    value={formData.cuerpo}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <StyledMenuItem value="" disabled>
                      Seleccione un cuerpo
                    </StyledMenuItem>
                    <StyledMenuItem value="infanteria">Infanteria</StyledMenuItem>
                    <StyledMenuItem value="caballeria">Caballeria</StyledMenuItem>
                    <StyledMenuItem value="artilleria">Artilleria</StyledMenuItem>
                    <StyledMenuItem value="ingenieros">Ingenieros</StyledMenuItem>
                    <StyledMenuItem value="comunicaciones">Comunicaciones</StyledMenuItem>
                  </StyledSelect>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>Escalafon</FieldLabel>
                <StyledTextField
                  fullWidth
                  name="escalafon"
                  value={formData.escalafon}
                  onChange={handleChange}
                  placeholder="Ingrese el escalafon"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <SectionTitle>Clasificacion y Permisos</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Nivel <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledFormControl fullWidth>
                  <StyledSelect
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <StyledMenuItem value="" disabled>
                      Seleccione un nivel
                    </StyledMenuItem>
                    <StyledMenuItem value="1">Nivel 1</StyledMenuItem>
                    <StyledMenuItem value="2">Nivel 2</StyledMenuItem>
                    <StyledMenuItem value="3">Nivel 3</StyledMenuItem>
                    <StyledMenuItem value="4">Nivel 4</StyledMenuItem>
                    <StyledMenuItem value="5">Nivel 5</StyledMenuItem>
                  </StyledSelect>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Tipo de Clasificacion <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledFormControl fullWidth>
                  <StyledSelect
                    name="tipoClasificacion"
                    value={formData.tipoClasificacion}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <StyledMenuItem value="" disabled>
                      Seleccione un tipo
                    </StyledMenuItem>
                    <StyledMenuItem value="publico">Publico</StyledMenuItem>
                    <StyledMenuItem value="restringido">Restringido</StyledMenuItem>
                    <StyledMenuItem value="confidencial">Confidencial</StyledMenuItem>
                    <StyledMenuItem value="secreto">Secreto</StyledMenuItem>
                    <StyledMenuItem value="alto-secreto">Alto Secreto</StyledMenuItem>
                  </StyledSelect>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>Confianza</FieldLabel>
                <SwitchContainer>
                  <Typography sx={{ color: '#E2E8F0', fontWeight: 500, fontSize: '15px' }}>
                    Otorgar permisos de confianza
                  </Typography>
                  <StyledSwitch
                    name="confianza"
                    checked={formData.confianza}
                    onChange={handleSwitchChange}
                  />
                </SwitchContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>Superconfianza</FieldLabel>
                <SwitchContainer>
                  <Typography sx={{ color: '#E2E8F0', fontWeight: 500, fontSize: '15px' }}>
                    Otorgar permisos de superconfianza
                  </Typography>
                  <StyledSwitch
                    name="superconfianza"
                    checked={formData.superconfianza}
                    onChange={handleSwitchChange}
                  />
                </SwitchContainer>
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <SectionTitle>Datos de Acceso</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Usuario <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre de usuario"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Contrasena <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  placeholder="Ingrese la contrasena"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>
                  Confirmar Contrasena <span style={{ color: '#EF4444' }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  type="password"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  placeholder="Confirme la contrasena"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 4:
        return (
          <Box>
            <SectionTitle>Revision de Datos</SectionTitle>

            <ConfirmationCard>
              <Typography sx={{ color: '#FFFFFF', fontSize: '18px', mb: 2, fontWeight: 600 }}>
                Datos Personales
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: 1,
                }}
              >
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Nombre:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.nombre}</Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Apellido:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.apellido}</Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>
                  Matricula de Revista:
                </Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.matricula}</Typography>
              </Box>
            </ConfirmationCard>

            <ConfirmationCard>
              <Typography sx={{ color: '#FFFFFF', fontSize: '18px', mb: 2, fontWeight: 600 }}>
                Informacion Militar
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: 1,
                }}
              >
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Jerarquia:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.jerarquia}</Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Destino:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.destino}</Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Cuerpo:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.cuerpo || 'N/A'}</Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Escalafon:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.escalafon || 'N/A'}</Typography>
              </Box>
            </ConfirmationCard>

            <ConfirmationCard>
              <Typography sx={{ color: '#FFFFFF', fontSize: '18px', mb: 2, fontWeight: 600 }}>
                Clasificacion y Permisos
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: 1,
                }}
              >
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Nivel:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>Nivel {formData.nivel}</Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>
                  Tipo de Clasificacion:
                </Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.tipoClasificacion}</Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Confianza:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>
                  {formData.confianza ? 'Si' : 'No'}
                </Typography>
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>
                  Superconfianza:
                </Typography>
                <Typography sx={{ color: '#E2E8F0' }}>
                  {formData.superconfianza ? 'Si' : 'No'}
                </Typography>
              </Box>
            </ConfirmationCard>

            <ConfirmationCard>
              <Typography sx={{ color: '#FFFFFF', fontSize: '18px', mb: 2, fontWeight: 600 }}>
                Datos de Acceso
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: 1,
                }}
              >
                <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Usuario:</Typography>
                <Typography sx={{ color: '#E2E8F0' }}>{formData.usuario}</Typography>
              </Box>
            </ConfirmationCard>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <StyledPaper sx={{ maxWidth: '88%', width: '100%', mx: 'auto', my: 3 }}>
      <StyledStepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StyledStepper>

      <Box sx={{ padding: '40px' }}>
        {renderStepContent(activeStep)}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '40px',
            gap: '15px',
          }}
        >
          {activeStep > 0 && (
            <SecondaryButton onClick={handleBack}>Anterior</SecondaryButton>
          )}
          {activeStep < steps.length - 1 ? (
            <PrimaryButton onClick={handleNext} sx={{ ml: activeStep === 0 ? 'auto' : 0 }}>
              Siguiente
            </PrimaryButton>
          ) : (
            <SuccessButton onClick={handleSubmit} sx={{ ml: 'auto' }}>
              Confirmar
            </SuccessButton>
          )}
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default CreateUsersForm;