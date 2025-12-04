import React, { useState } from 'react';
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
  Checkbox,
  Typography,
  CircularProgress,
  Alert,
  InputLabel,
  FormControl,
  FormHelperText,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

const steps = ['Datos Personales y Acceso', 'Informacion Militar', 'Acceso y Permisos', 'Resumen'];

const Step0 = ({ formData, errors, touched, onChange, onCheckboxChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation);

  return (
    <Box sx={{ p: 3, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <PersonIcon sx={{ color: '#3B82F6', fontSize: '22px' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
            Datos Personales
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
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
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LockIcon sx={{ color: '#3B82F6', fontSize: '22px' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
            Datos de Acceso al Sistema
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
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
            label="Contrasena"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={onChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirmar Contrasena"
            name="passwordConfirmation"
            type={showPasswordConfirmation ? 'text' : 'password'}
            value={formData.passwordConfirmation}
            onChange={onChange}
            error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPasswordConfirmation}
                    edge="end"
                    size="small"
                  >
                    {showPasswordConfirmation ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Caducidad de Contrasena"
            name="fechaCaducidadPassword"
            type="date"
            value={formData.fechaCaducidadPassword || ''}
            onChange={onChange}
            error={touched.fechaCaducidadPassword && Boolean(errors.fechaCaducidadPassword)}
            helperText={touched.fechaCaducidadPassword && errors.fechaCaducidadPassword}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
          />
        </Box>

        <Box
          sx={{
            p: 2,
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: '#374151' }}>
            Opciones de Seguridad
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="solicitarCambioPassword"
                  checked={formData.solicitarCambioPassword}
                  onChange={onCheckboxChange}
                />
              }
              label="Solicitar cambio de contrasena en el proximo inicio de sesion"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="noBloquearUsuario"
                  checked={formData.noBloquearUsuario}
                  onChange={onCheckboxChange}
                />
              }
              label="El usuario no se bloquea"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Step1 = ({ formData, errors, touched, onChange, onSelectChange, getJerarquiasPorCategoria }) => {
  const jerarquiasDisponibles = getJerarquiasPorCategoria(formData.categoriaPersonal);

  const handleCategoriaChange = (categoria) => {
    if (formData.categoriaPersonal === categoria) {
      onSelectChange('categoriaPersonal', '');
    } else {
      onSelectChange('categoriaPersonal', categoria);
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <BadgeIcon sx={{ color: '#3B82F6', fontSize: '22px' }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
          Informacion Militar
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Matricula de Revista"
            name="matriculaRevista"
            value={formData.matriculaRevista}
            onChange={onChange}
            error={touched.matriculaRevista && Boolean(errors.matriculaRevista)}
            helperText={touched.matriculaRevista && errors.matriculaRevista}
            fullWidth
            size="small"
            placeholder="000000"
            inputProps={{
              maxLength: 6,
            }}
          />

          <FormControl
            fullWidth
            size="small"
            error={touched.destino && Boolean(errors.destino)}
          >
            <InputLabel>Destino</InputLabel>
            <Select
              label="Destino"
              name="destino"
              value={formData.destino}
              onChange={(e) => onSelectChange('destino', e.target.value)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              <MenuItem value="Oficina Central">Oficina Central</MenuItem>
              <MenuItem value="Sede Regional">Sede Regional</MenuItem>
              <MenuItem value="Destacamento">Destacamento</MenuItem>
              <MenuItem value="Terreno">Terreno</MenuItem>
            </Select>
            {touched.destino && errors.destino && (
              <FormHelperText>{errors.destino}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'flex-start' }}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', height: '40px' }}>
            <FormControlLabel
              control={
                <Box
                  component="input"
                  type="radio"
                  checked={formData.categoriaPersonal === 'Oficial'}
                  onChange={() => handleCategoriaChange('Oficial')}
                  sx={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#3B82F6',
                  }}
                />
              }
              label="Oficial"
              sx={{ mb: 0 }}
            />
            <FormControlLabel
              control={
                <Box
                  component="input"
                  type="radio"
                  checked={formData.categoriaPersonal === 'Suboficial'}
                  onChange={() => handleCategoriaChange('Suboficial')}
                  sx={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#3B82F6',
                  }}
                />
              }
              label="Suboficial"
              sx={{ mb: 0 }}
            />
            <FormControlLabel
              control={
                <Box
                  component="input"
                  type="radio"
                  checked={formData.categoriaPersonal === 'Personal Civil'}
                  onChange={() => handleCategoriaChange('Personal Civil')}
                  sx={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#3B82F6',
                  }}
                />
              }
              label="Personal Civil"
              sx={{ mb: 0 }}
            />
          </Box>

          {formData.categoriaPersonal && (
            <FormControl
              fullWidth
              size="small"
              error={touched.jerarquia && Boolean(errors.jerarquia)}
            >
              <InputLabel>Jerarquia</InputLabel>
              <Select
                label="Jerarquia"
                name="jerarquia"
                value={formData.jerarquia}
                onChange={(e) => onSelectChange('jerarquia', e.target.value)}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {jerarquiasDisponibles.map((j) => (
                  <MenuItem key={j} value={j}>
                    {j}
                  </MenuItem>
                ))}
              </Select>
              {touched.jerarquia && errors.jerarquia && (
                <FormHelperText>{errors.jerarquia}</FormHelperText>
              )}
            </FormControl>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const Step2 = ({ formData, errors, touched, onSelectChange, onCheckboxChange }) => (
  <Box sx={{ p: 3, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
      <SecurityIcon sx={{ color: '#3B82F6', fontSize: '22px' }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
        Acceso y Permisos
      </Typography>
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
      <FormControl
        fullWidth
        size="small"
        error={touched.rol && Boolean(errors.rol)}
      >
        <InputLabel>Rol</InputLabel>
        <Select
          label="Rol"
          name="rol"
          value={formData.rol}
          onChange={(e) => onSelectChange('rol', e.target.value)}
        >
          <MenuItem value="">Seleccionar</MenuItem>
          <MenuItem value="Super Administrador">Super Administrador</MenuItem>
          <MenuItem value="Administrador">Administrador</MenuItem>
          <MenuItem value="Operador">Operador</MenuItem>
          <MenuItem value="Consultor">Consultor</MenuItem>
          <MenuItem value="Usuario">Usuario</MenuItem>
        </Select>
        {touched.rol && errors.rol && (
          <FormHelperText>{errors.rol}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        size="small"
        error={touched.clasificacion && Boolean(errors.clasificacion)}
      >
        <InputLabel>Clasificacion</InputLabel>
        <Select
          label="Clasificacion"
          name="clasificacion"
          value={formData.clasificacion}
          onChange={(e) => onSelectChange('clasificacion', e.target.value)}
        >
          <MenuItem value="">Seleccionar</MenuItem>
          <MenuItem value="Publico">Publico</MenuItem>
          <MenuItem value="Interno">Interno</MenuItem>
          <MenuItem value="Confidencial">Confidencial</MenuItem>
          <MenuItem value="Secreto">Secreto</MenuItem>
        </Select>
        {touched.clasificacion && errors.clasificacion && (
          <FormHelperText>{errors.clasificacion}</FormHelperText>
        )}
      </FormControl>
    </Box>

    <Box
      sx={{
        p: 2,
        backgroundColor: '#F9FAFB',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: '#374151' }}>
        Permisos Especiales
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
      </Box>
    </Box>
  </Box>
);

const Step3 = ({ formData }) => (
  <Box sx={{ p: 3, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#111827' }}>
      Resumen de Datos del Usuario
    </Typography>

    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <PersonIcon sx={{ color: '#3B82F6', fontSize: '20px' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Datos Personales
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Apellido:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.apellido || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Nombre:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.nombre || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
            <Typography variant="body2" color="text.secondary">Usuario:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.logon || 'N/A'}</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LockIcon sx={{ color: '#3B82F6', fontSize: '20px' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Configuracion de Acceso
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Cambio de contrasena:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.solicitarCambioPassword ? 'Si' : 'No'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">No bloquear usuario:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.noBloquearUsuario ? 'Si' : 'No'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
            <Typography variant="body2" color="text.secondary">Caducidad contrasena:</Typography>
            <Typography variant="body2" fontWeight={600}>
              {formData.fechaCaducidadPassword 
                ? new Date(formData.fechaCaducidadPassword).toLocaleDateString('es-AR')
                : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <BadgeIcon sx={{ color: '#3B82F6', fontSize: '20px' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Informacion Militar
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Matricula de Revista:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.matriculaRevista || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Categoria:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.categoriaPersonal || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Jerarquia:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.jerarquia || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
            <Typography variant="body2" color="text.secondary">Destino:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.destino || 'N/A'}</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <SecurityIcon sx={{ color: '#3B82F6', fontSize: '20px' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Acceso y Permisos
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Rol:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.rol || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Clasificacion:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.clasificacion || 'N/A'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #E5E7EB' }}>
            <Typography variant="body2" color="text.secondary">Confianza:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.confianza ? 'Si' : 'No'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
            <Typography variant="body2" color="text.secondary">Super Confianza:</Typography>
            <Typography variant="body2" fontWeight={600}>{formData.superConfianza ? 'Si' : 'No'}</Typography>
          </Box>
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
  getJerarquiasPorCategoria,
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

      <Box sx={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
        {activeStep === 0 && (
          <Step0
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={onInputChange}
            onCheckboxChange={onCheckboxChange}
          />
        )}
        {activeStep === 1 && (
          <Step1
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={onInputChange}
            onSelectChange={onSelectChange}
            getJerarquiasPorCategoria={getJerarquiasPorCategoria}
          />
        )}
        {activeStep === 2 && (
          <Step2
            formData={formData}
            errors={errors}
            touched={touched}
            onSelectChange={onSelectChange}
            onCheckboxChange={onCheckboxChange}
          />
        )}
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
          Atras
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