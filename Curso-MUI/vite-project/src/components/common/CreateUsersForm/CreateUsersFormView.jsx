import React from 'react';
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from '@mui/icons-material';

const steps = ['Datos Personales y Acceso', 'Información Militar', 'Acceso y Permisos', 'Resumen'];

const Step0 = ({ formData, errors, touched, onChange, onSelectChange }) => (
  <Box sx={{ p: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
    <TextField
      label="Apellido"
      name="apellido"
      value={formData.apellido}
      onChange={onChange}
      error={touched.apellido && Boolean(errors.apellido)}
      helperText={touched.apellido && errors.apellido}
      fullWidth
      size="small"
    />
    <TextField
      label="Nombre"
      name="nombre"
      value={formData.nombre}
      onChange={onChange}
      error={touched.nombre && Boolean(errors.nombre)}
      helperText={touched.nombre && errors.nombre}
      fullWidth
      size="small"
    />
    <TextField
      label="Usuario"
      name="logon"
      value={formData.logon}
      onChange={onChange}
      error={touched.logon && Boolean(errors.logon)}
      helperText={touched.logon && errors.logon}
      fullWidth
      size="small"
    />
    <TextField
      label="Contraseña"
      name="password"
      type="password"
      value={formData.password}
      onChange={onChange}
      error={touched.password && Boolean(errors.password)}
      helperText={touched.password && errors.password}
      fullWidth
      size="small"
    />
    <TextField
      label="Confirmar Contraseña"
      name="passwordConfirmation"
      type="password"
      value={formData.passwordConfirmation}
      onChange={onChange}
      error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
      helperText={touched.passwordConfirmation && errors.passwordConfirmation}
      fullWidth
      size="small"
    />
  </Box>
);
const Step1 = ({ formData, errors, touched, onChange, onSelectChange }) => (
  <Box sx={{ p: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
    <Select
      label="Jerarquía"
      name="jerarquia"
      value={formData.jerarquia}
      onChange={(e) => onSelectChange('jerarquia', e.target.value)}
      error={touched.jerarquia && Boolean(errors.jerarquia)}
      displayEmpty
      size="small"
      sx={{
        color: 'text.primary',
        backgroundColor: '#FFFFFF',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E5E7EB'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#D1D5DB'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#3B82F6'
        }
      }}
    >
      <MenuItem value="">Seleccionar</MenuItem>
      <MenuItem value="Soldado">Soldado</MenuItem>
      <MenuItem value="Cabo">Cabo</MenuItem>
      <MenuItem value="Sargento">Sargento</MenuItem>
      <MenuItem value="Suboficial">Suboficial</MenuItem>
      <MenuItem value="Oficial">Oficial</MenuItem>
      <MenuItem value="Teniente">Teniente</MenuItem>
      <MenuItem value="Capitán">Capitán</MenuItem>
      <MenuItem value="Mayor">Mayor</MenuItem>
      <MenuItem value="Coronel">Coronel</MenuItem>
    </Select>

    <Select
      label="Destino"
      name="destino"
      value={formData.destino}
      onChange={(e) => onSelectChange('destino', e.target.value)}
      error={touched.destino && Boolean(errors.destino)}
      displayEmpty
      size="small"
      sx={{
        color: 'text.primary',
        backgroundColor: '#FFFFFF',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E5E7EB'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#D1D5DB'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#3B82F6'
        }
      }}
    >
      <MenuItem value="">Seleccionar</MenuItem>
      <MenuItem value="Oficina Central">Oficina Central</MenuItem>
      <MenuItem value="Sede Regional">Sede Regional</MenuItem>
      <MenuItem value="Destacamento">Destacamento</MenuItem>
      <MenuItem value="Terreno">Terreno</MenuItem>
    </Select>
  </Box>
);

const Step2 = ({ formData, errors, touched, onChange, onSelectChange, onCheckboxChange }) => (
  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <Select
        label="Rol"
        name="rol"
        value={formData.rol}
        onChange={(e) => onSelectChange('rol', e.target.value)}
        error={touched.rol && Boolean(errors.rol)}
        displayEmpty
        size="small"
        sx={{
          color: 'text.primary',
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5E7EB'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3B82F6'
          }
        }}
      >
        <MenuItem value="">Seleccionar</MenuItem>
        <MenuItem value="Super Administrador">Super Administrador</MenuItem>
        <MenuItem value="Administrador">Administrador</MenuItem>
        <MenuItem value="Operador">Operador</MenuItem>
        <MenuItem value="Consultor">Consultor</MenuItem>
        <MenuItem value="Usuario">Usuario</MenuItem>
      </Select>

      <Select
        label="Clasificación"
        name="clasificacion"
        value={formData.clasificacion}
        onChange={(e) => onSelectChange('clasificacion', e.target.value)}
        error={touched.clasificacion && Boolean(errors.clasificacion)}
        displayEmpty
        size="small"
        sx={{
          color: 'text.primary',
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5E7EB'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3B82F6'
          }
        }}
      >
        <MenuItem value="">Seleccionar</MenuItem>
        <MenuItem value="Público">Público</MenuItem>
        <MenuItem value="Interno">Interno</MenuItem>
        <MenuItem value="Confidencial">Confidencial</MenuItem>
        <MenuItem value="Secreto">Secreto</MenuItem>
      </Select>
    </Box>

    <Paper sx={{ p: 2, background: '#F9FAFB' }}>
      <FormControlLabel
        control={
          <Switch
            name="confianza"
            checked={formData.confianza}
            onChange={onCheckboxChange}
          />
        }
        label="Acceso de Confianza"
      />
      <FormControlLabel
        control={
          <Switch
            name="superConfianza"
            checked={formData.superConfianza}
            onChange={onCheckboxChange}
          />
        }
        label="Super Confianza"
      />
    </Paper>
  </Box>
);

const Step3 = ({ formData }) => (
  <Box sx={{ p: 3 }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Datos Personales
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Apellido:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.apellido || 'N/A'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Nombre:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.nombre || 'N/A'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Usuario:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.logon || 'N/A'}</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Información Militar
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Jerarquía:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.jerarquia || 'N/A'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Destino:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.destino || 'N/A'}</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Acceso y Permisos
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Rol:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.rol || 'N/A'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Clasificación:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.clasificacion || 'N/A'}</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Permisos Especiales
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Confianza:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.confianza ? 'Sí' : 'No'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Super Confianza:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formData.superConfianza ? 'Sí' : 'No'}</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default function CreateUsersFormView({
  activeStep,
  formData,
  errors,
  touched,
  loading,
  submitSuccess,
  submitError,
  onInputChange,
  onSelectChange,
  onCheckboxChange,
  onNext,
  onBack,
  onSubmit,
  onReset,
}) {
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  return (
    <Paper
      elevation={0}
      sx={{
        background: 'background.paper',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        maxWidth: '1400px',
        mx: 'auto',
      }}
    >
      {submitSuccess && (
        <Box sx={{ px: 2, py: 1.5 }}>
          <Alert severity="success" icon={<CheckIcon />}>
            Usuario creado exitosamente
          </Alert>
        </Box>
      )}

      {submitError && (
        <Box sx={{ px: 2, py: 1.5 }}>
          <Alert severity="error" icon={<ErrorOutlineIcon />}>
            {submitError}
          </Alert>
        </Box>
      )}

      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ minHeight: '300px' }}>
        {activeStep === 0 && <Step0 formData={formData} errors={errors} touched={touched} onChange={onInputChange} onSelectChange={onSelectChange} />}
        {activeStep === 1 && <Step1 formData={formData} errors={errors} touched={touched} onChange={onInputChange} onSelectChange={onSelectChange} />}
        {activeStep === 2 && <Step2 formData={formData} errors={errors} touched={touched} onChange={onInputChange} onSelectChange={onSelectChange} onCheckboxChange={onCheckboxChange} />}
        {activeStep === 3 && <Step3 formData={formData} />}
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={isFirst || loading}
        >
          Atrás
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isLast && (
            <Button
              variant="contained"
              onClick={onNext}
              disabled={loading}
            >
              Siguiente
            </Button>
          )}

          {isLast && (
            <>
              <Button
                variant="outlined"
                onClick={onReset}
                disabled={loading}
              >
                Limpiar
              </Button>
              <Button
                variant="contained"
                onClick={onSubmit}
                disabled={loading}
                sx={{ background: '#10B981' }}
              >
                {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Crear Usuario'}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}