import { useState } from 'react';

export const usePreferencias = () => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(false);

  const toggleNotificaciones = () => setNotificaciones(!notificaciones);
  const toggleTema = () => setTemaOscuro(!temaOscuro);

  return {
    notificaciones,
    temaOscuro,
    toggleNotificaciones,
    toggleTema
  };
};