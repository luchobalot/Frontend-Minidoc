// src/pages/Login/useLogin.js (Nuevo Contenido)
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // 1. Importar el nuevo hook de lógica
import { useAuthStore } from '../../stores/useAuthStore'; // 2. Importar el store para datos de usuario

export const useLogin = () => {
  // --- Estados de Formulario para mantener la interfaz ---
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const navigate = useNavigate();
  
  // --- Integración de la nueva lógica de autenticación ---
  const { status, errorMessage, startLogin } = useAuth();
  
  // Mapeo de estados para compatibilidad con la interfaz anterior
  const user = useAuthStore((state) => state.user);
  const isLoading = status === 'checking'; // Estado de carga
  const loginSuccess = status === 'authenticated' && !isLoading; // Éxito de login

  // --- Lógica de Redirección y Animación (del archivo anterior) ---
  useEffect(() => {
    // Si el nuevo status es 'authenticated', iniciar la secuencia de animación y redirección
    if (loginSuccess) {
      setIsExiting(true); // Inicia la animación de salida de la Paper
      
      setTimeout(() => {
        // Redirigir al cabo de un tiempo total (ej. 500ms + 1000ms = 1.5s)
        navigate('/inicio', { replace: true });
      }, 1500); 
    }
  }, [loginSuccess, navigate]);


  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // La limpieza del mensaje de error se gestiona dentro del nuevo store/hook
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // El nuevo hook gestiona el estado de 'checking' y los errores.
    try {
      // Llamar a la nueva función de login. El nuevo hook espera 'email' y 'password'.
      await startLogin({ 
        username: formData.username,
        password: formData.password 
      });
      
    } catch (error) {
      // El error se propaga y se maneja internamente por el store,
      // que actualiza el 'errorMessage' que es consumido por LoginForm.jsx.
    }
  };

  // --- Retorno de Interfaz (Debe ser idéntico al anterior) ---
  return {
    formData,
    showPassword,
    isLoading,
    errorMessage, // Usar directamente el errorMessage del nuevo hook/store
    loginSuccess,
    isExiting,
    userData: user, // Ahora viene del nuevo useAuthStore
    setShowPassword,
    handleInputChange,
    handleSubmit,
  };
};