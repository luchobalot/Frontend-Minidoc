import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { login as apiLogin, getUserData } from '../../services/authService';

export const useLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const { login: storeLogin, isAuthenticated, isAuthReady } = useAuthStore();

  useEffect(() => {
    if (isAuthReady && isAuthenticated && !isLoading && !loginSuccess && !isExiting) {
      navigate('/login', { replace: true });
    }
  }, [isAuthReady, isAuthenticated, isLoading, loginSuccess, isExiting, navigate]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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

      // Primer login con token
      storeLogin({}, token, fechaExpiracion);

      // Obtener datos del usuario
      const userDataResponse = await getUserData(userId);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
      setIsExiting(true);

      // Segundo login con datos completos del usuario
      storeLogin(userDataResponse, token, fechaExpiracion);
      
      setUserData(userDataResponse);

      setTimeout(() => {
        setLoginSuccess(true);

        setTimeout(() => {
          navigate('/inicio', { replace: true });
        }, 1000);
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
      
      console.error('Error al iniciar sesion:', error);
    }
  };

  return {
    formData,
    showPassword,
    isLoading,
    errorMessage,
    loginSuccess,
    isExiting,
    userData,
    setShowPassword,
    handleInputChange,
    handleSubmit,
  };
};