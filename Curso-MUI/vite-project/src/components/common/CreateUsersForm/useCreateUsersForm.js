import { useState, useCallback } from 'react';

export const useCreateUsersForm = (onSubmitCallback) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    apellido: '',
    nombre: '',
    logon: '',
    password: '',
    passwordConfirmation: '',
    solicitarCambioPassword: false,
    noBloquearUsuario: false,
    fechaCaducidadPassword: '',
    categoriaPersonal: '',
    matriculaRevista: '',
    jerarquia: '',
    destino: '',
    rol: '',
    clasificacion: '',
    confianza: false,
    superConfianza: false,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const getJerarquiasPorCategoria = useCallback((categoria) => {
    const jerarquias = {
      Oficial: [
        'Subteniente',
        'Teniente',
        'Capitán',
        'Mayor',
        'Teniente Coronel',
        'Coronel',
        'General',
      ],
      Suboficial: [
        'Suboficial Ayudante',
        'Suboficial Principal',
        'Suboficial Mayor',
      ],
      'Personal Civil': ['Personal Civil'],
    };
    return jerarquias[categoria] || [];
  }, []);

  const validateStep = useCallback((step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (formData.apellido?.trim() && !formData.nombre?.trim()) {
          newErrors.nombre = 'Requerido si ingresa apellido';
        }
        if (formData.nombre?.trim() && !formData.apellido?.trim()) {
          newErrors.apellido = 'Requerido si ingresa nombre';
        }
        if (formData.logon?.trim() && !formData.password?.trim()) {
          newErrors.password = 'Requerido si ingresa usuario';
        }
        if (formData.password?.trim() && !formData.logon?.trim()) {
          newErrors.logon = 'Requerido si ingresa contraseña';
        }
        if (formData.password && formData.passwordConfirmation && formData.password !== formData.passwordConfirmation) {
          newErrors.passwordConfirmation = 'Las contraseñas no coinciden';
        }
        if (formData.password && formData.password.length > 0 && formData.password.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        if (formData.fechaCaducidadPassword) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selectedDate = new Date(formData.fechaCaducidadPassword);
          selectedDate.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            newErrors.fechaCaducidadPassword = 'La fecha debe ser igual o posterior a hoy';
          }
        }
        break;
      case 1:
        if (formData.matriculaRevista?.trim()) {
          if (!/^\d{6}$/.test(formData.matriculaRevista)) {
            newErrors.matriculaRevista = 'Debe contener exactamente 6 dígitos';
          }
        }
        break;
      case 2:
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const onSelectChange = useCallback((name, value) => {
    const updatedData = { ...formData, [name]: value };
    
    if (name === 'categoriaPersonal') {
      updatedData.jerarquia = '';
    }
    
    setFormData(updatedData);
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, [formData]);

  const onCheckboxChange = useCallback((e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  }, []);

  const onNext = useCallback(() => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  }, [activeStep, validateStep]);

  const onBack = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    if (!validateStep(activeStep)) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const result = await onSubmitCallback(formData);

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          apellido: '',
          nombre: '',
          logon: '',
          password: '',
          passwordConfirmation: '',
          solicitarCambioPassword: false,
          noBloquearUsuario: false,
          fechaCaducidadPassword: '',
          categoriaPersonal: '',
          matriculaRevista: '',
          jerarquia: '',
          destino: '',
          rol: '',
          clasificacion: '',
          confianza: false,
          superConfianza: false,
        });
        setTouched({});
        setErrors({});
        setActiveStep(0);

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(result.error || 'Error al crear usuario');
      }
    } catch (err) {
      setSubmitError(err.message || 'Error al crear usuario');
    } finally {
      setLoading(false);
    }
  }, [activeStep, formData, onSubmitCallback, validateStep]);

  const onReset = useCallback(() => {
    setFormData({
      apellido: '',
      nombre: '',
      logon: '',
      password: '',
      passwordConfirmation: '',
      solicitarCambioPassword: false,
      noBloquearUsuario: false,
      fechaCaducidadPassword: '',
      categoriaPersonal: '',
      matriculaRevista: '',
      jerarquia: '',
      destino: '',
      rol: '',
      clasificacion: '',
      confianza: false,
      superConfianza: false,
    });
    setTouched({});
    setErrors({});
    setActiveStep(0);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
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
    handleFormSubmit,
    onReset,
    getJerarquiasPorCategoria,
  };
};