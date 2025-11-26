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

  const validateStep = useCallback((step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.apellido?.trim()) newErrors.apellido = 'Requerido';
        if (!formData.nombre?.trim()) newErrors.nombre = 'Requerido';
        if (!formData.logon?.trim()) newErrors.logon = 'Requerido';
        if (!formData.password?.trim()) newErrors.password = 'Requerido';
        if (!formData.passwordConfirmation?.trim()) newErrors.passwordConfirmation = 'Requerido';
        if (formData.password && formData.passwordConfirmation && formData.password !== formData.passwordConfirmation) {
          newErrors.passwordConfirmation = 'Las contraseñas no coinciden';
        }
        if (formData.password && formData.password.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        break;
      case 1:
        if (!formData.matriculaRevista?.trim()) {
          newErrors.matriculaRevista = 'Requerido';
        } else if (!/^\d{6}$/.test(formData.matriculaRevista)) {
          newErrors.matriculaRevista = 'Debe contener exactamente 6 dígitos';
        }
        if (!formData.jerarquia?.trim()) newErrors.jerarquia = 'Requerido';
        if (!formData.destino?.trim()) newErrors.destino = 'Requerido';
        break;
      case 2:
        if (!formData.rol?.trim()) newErrors.rol = 'Requerido';
        if (!formData.clasificacion?.trim()) newErrors.clasificacion = 'Requerido';
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

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
  };
};