// src/pages/Login/Login.jsx
import React, { useState, useEffect } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, getUserData } from '../../services/authService';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  Alert,
  styled,
  keyframes,
  CircularProgress,
  Collapse,
  alpha,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Email,
  CheckCircle
} from '@mui/icons-material';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideOutLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50px) scale(0.95);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const BackgroundBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const LoginPaper = styled(Paper)(({ theme, isExiting }) => ({
  width: '100%',
  maxWidth: 420,
  padding: '2.5rem 2.5rem',
  borderRadius: 16,
  animation: isExiting 
    ? `${slideOutLeft} 0.4s ease-in forwards`
    : `${fadeIn} 0.4s ease-out`,
  position: 'relative',
  zIndex: 10,
  background: theme.palette.background.paper,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  
  '@media (max-width: 768px)': {
    maxWidth: '90%',
    padding: '2rem 1.5rem',
  },
  
  '@media (max-height: 900px)': {
    padding: '2rem 2rem',
    maxHeight: '85vh',
  },
  
  '@media (max-height: 750px)': {
    padding: '1.5rem 2rem',
    maxHeight: '90vh',
  },
  
  '@media (max-height: 650px)': {
    padding: '1.25rem 1.75rem',
    maxHeight: '95vh',
  },
}));

const WelcomePaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 420,
  padding: '3rem 2.5rem',
  borderRadius: 16,
  animation: `${slideInRight} 0.4s ease-out`,
  position: 'relative',
  zIndex: 10,
  background: theme.palette.background.paper,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  
  '@media (max-width: 768px)': {
    maxWidth: '90%',
    padding: '2.5rem 1.5rem',
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  background: theme.palette.primary.main,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.25rem',
  '& svg': {
    fontSize: '1.75rem',
    color: theme.palette.primary.contrastText,
  },
  
  '@media (max-height: 750px)': {
    width: 56,
    height: 56,
    margin: '0 auto 1rem',
    '& svg': {
      fontSize: '1.5rem',
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.3),
    color: theme.palette.text.secondary,
    borderRadius: 8,
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: alpha(theme.palette.secondary.main, 0.3),
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
      '& fieldset': {
        borderColor: alpha(theme.palette.secondary.main, 0.5),
      },
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.secondary.dark, 0.5),
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
        borderWidth: '1px',
      },
    },
    '& input': {
      color: theme.palette.text.primary,
      fontSize: '0.95rem',
      padding: '0.75rem 0.875rem',
      '&::placeholder': {
        color: alpha(theme.palette.text.secondary, 0.5),
        opacity: 1,
      },
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
        WebkitBoxShadow: '0 0 0 100px transparent inset !important',
        WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        transition: 'background-color 5000s ease-in-out 0s',
        caretColor: theme.palette.text.primary,
      },
      '&:-moz-autofill, &:-moz-autofill:hover, &:-moz-autofill:focus': {
        backgroundColor: 'transparent !important',
        color: `${theme.palette.text.primary} !important`,
        filter: 'none !important',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontSize: '0.95rem',
    fontWeight: 600,
    '&.Mui-focused': {
      color: theme.palette.text.secondary,
    },
  },
  '& .MuiInputAdornment-root svg': {
    color: alpha(theme.palette.text.secondary, 0.6),
    fontSize: '1.25rem',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  padding: '0.875rem',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 8,
  boxShadow: 'none',
  '&:hover': {
    background: theme.palette.primary.dark,
    boxShadow: 'none',
  },
  '&:active': {
    background: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
    background: alpha(theme.palette.primary.main, 0.5),
    color: alpha(theme.palette.primary.contrastText, 0.5),
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiCheckbox-root': {
    color: alpha(theme.palette.text.secondary, 0.5),
    padding: '6px',
    '&.Mui-checked': {
      color: theme.palette.secondary.main,
    },
    '&.Mui-disabled': {
      color: alpha(theme.palette.text.secondary, 0.3),
    },
  },
  '& .MuiTypography-root': {
    color: alpha(theme.palette.text.secondary, 0.8),
    fontSize: '0.9rem',
  },
  '&.Mui-disabled .MuiTypography-root': {
    color: alpha(theme.palette.text.secondary, 0.6),
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '0.9rem',
  fontWeight: 500,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const CheckIconBox = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  background: theme.palette.success.main,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.5rem',
  '& svg': {
    fontSize: '3rem',
    color: theme.palette.primary.contrastText,
  },
}));

const LoadingDot = styled(Box)(({ theme, delay }) => ({
  width: 6,
  height: 6,
  background: theme.palette.secondary.main,
  borderRadius: '50%',
  animation: 'pulse 1.5s ease-in-out infinite',
  animationDelay: `${delay}s`,
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 0.3,
    },
    '50%': {
      opacity: 1,
    },
  },
}));

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAuthReady, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthReady && isAuthenticated && !isLoading && !loginSuccess && !isExiting) {
      navigate('/test', { replace: true });
    }
  }, [isAuthReady, isAuthenticated, isLoading, loginSuccess, isExiting, navigate]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'remember' ? checked : value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const authResponse = await apiLogin(formData.username, formData.password);
      
      const { token, userId, fechaExpiracion } = authResponse;

      login({}, token, fechaExpiracion);

      const userDataResponse = await getUserData(userId);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
      setIsExiting(true);

      login(userDataResponse, token, fechaExpiracion);
      
      setUserData(userDataResponse);

      setTimeout(() => {
        setLoginSuccess(true);

        setTimeout(() => {
          navigate('/test', { replace: true });
        }, 2000);
      }, 500);

    } catch (error) {
      setIsLoading(false);
      
      if (error.firstErrorMessage) {
        setErrorMessage(error.firstErrorMessage);
      } else if (error.response?.status === 401) {
        setErrorMessage('Usuario o contrasena incorrectos');
      } else if (error.response?.status === 404) {
        setErrorMessage('Servicio de autenticacion no disponible');
      } else if (error.code === 'ERR_NETWORK') {
        setErrorMessage('Error de conexion con el servidor');
      } else {
        setErrorMessage('Error al iniciar sesion. Intente nuevamente');
      }
      
      console.error('Error en login:', error);
    }
  };

  return (
    <BackgroundBox>
      <Container 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
          py: 2,
        }}
      >
        {!loginSuccess ? (
          <LoginPaper elevation={0} isExiting={isExiting}>
            <Box>
              <Box 
                textAlign="center" 
                mb={3}
                sx={{ 
                  '@media (max-height: 750px)': { mb: 2 }
                }}
              >
                <LogoBox>
                  <Email />
                </LogoBox>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="text.primary"
                  mb={0.75}
                  sx={{ 
                    fontSize: '2rem', 
                    letterSpacing: '0.5px',
                    '@media (max-height: 750px)': {
                      fontSize: '1.75rem',
                      mb: 0.5,
                    },
                  }}
                >
                  MINIDOC
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: (theme) => alpha(theme.palette.text.secondary, 0.7),
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    '@media (max-height: 750px)': {
                      fontSize: '0.8rem',
                    },
                  }}
                >
                  Sistema de Gestion y Distribucion de GFH
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <Box 
                  mb={2}
                  sx={{ '@media (max-height: 750px)': { mb: 1.5 } }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 0.75,
                      fontSize: '0.875rem'
                    }}
                  >
                    Usuario
                  </Typography>
                  <StyledTextField
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Ingrese su usuario"
                    required
                    disabled={isLoading}
                    autoComplete="username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box 
                  mb={2}
                  sx={{ '@media (max-height: 750px)': { mb: 1.5 } }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 0.75,
                      fontSize: '0.875rem'
                    }}
                  >
                    Contrasena
                  </Typography>
                  <StyledTextField
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Ingrese su contrasena"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            disabled={isLoading}
                            sx={{ 
                              color: (theme) => alpha(theme.palette.text.secondary, 0.6),
                              '&:hover': {
                                color: (theme) => alpha(theme.palette.text.secondary, 0.8)
                              }
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Collapse in={!!errorMessage}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 2,
                      backgroundColor: 'rgba(220, 38, 38, 0.15)',
                      color: '#FCA5A5',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      '& .MuiAlert-icon': {
                        color: '#FCA5A5'
                      }
                    }}
                  >
                    {errorMessage}
                  </Alert>
                </Collapse>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2.5}
                  sx={{ '@media (max-height: 750px)': { mb: 2 } }}
                >
                  <StyledFormControlLabel
                    control={
                      <Checkbox
                        name="remember"
                        checked={formData.remember}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    }
                    label="Recordarme"
                  />
                  <StyledLink href="#" variant="body2">
                    Olvidaste tu contrasena?
                  </StyledLink>
                </Box>

                <LoginButton
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress 
                      size={24} 
                      thickness={4}
                      sx={{ color: 'primary.contrastText' }} 
                    />
                  ) : (
                    'Iniciar Sesion'
                  )}
                </LoginButton>
              </Box>

              <Box 
                mt={3}
                pt={2.5}
                borderTop="1px solid"
                borderColor={(theme) => alpha(theme.palette.secondary.main, 0.2)}
                textAlign="center"
                sx={{ 
                  '@media (max-height: 750px)': { mt: 2, pt: 2 }
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: (theme) => alpha(theme.palette.text.secondary, 0.6),
                    fontSize: '0.75rem',
                    display: 'block',
                    lineHeight: 1.4,
                  }}
                >
                  Servicio de Analisis Operativo, Armas y Guerra Electronica
                </Typography>
              </Box>
            </Box>
          </LoginPaper>
        ) : (
          <WelcomePaper elevation={0}>
            <Box textAlign="center" py={2}>
              <CheckIconBox>
                <CheckCircle />
              </CheckIconBox>
              
              <Typography
                variant="h4"
                fontWeight={700}
                color="text.primary"
                mb={2}
              >
                Bienvenido!
              </Typography>
              
              <Typography
                variant="h6"
                fontWeight={600}
                color="text.primary"
                mb={1}
              >
                {userData?.rank && (
                  <Box component="span" color="secondary.main" fontWeight={700}>
                    {userData.rank}{' '}
                  </Box>
                )}
                {userData?.firstName || ''} {userData?.lastName || ''}
              </Typography>
              
              <Typography
                variant="body2"
                mb={3}
                sx={{ color: (theme) => alpha(theme.palette.text.secondary, 0.7) }}
              >
                Accediendo al sistema MINIDOC...
              </Typography>
              
              <Box display="flex" gap={1} justifyContent="center">
                <LoadingDot delay={0} />
                <LoadingDot delay={0.15} />
                <LoadingDot delay={0.3} />
              </Box>
            </Box>
          </WelcomePaper>
        )}
      </Container>
    </BackgroundBox>
  );
}

export default Login;