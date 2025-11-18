// src/pages/MesaTrabajo/useMesaTrabajoPage.js
import { useState, useCallback } from 'react';

export const useMesaTrabajoPage = () => {
  const [activeSection, setActiveSection] = useState('mesa-trabajo-home');

  const getBreadcrumbs = useCallback(() => {
    const breadcrumbsMap = {
      'mesa-trabajo-home': [
        { label: 'Mesa de Trabajo' }, // Solo Mesa de Trabajo, sin href para que quede en negrita
      ],
      'conocimiento': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Conocimiento' },
      ],
      'recibidos': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Recibidos' },
      ],
      'girados': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Girados' },
      ],
      'transmitidos': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Transmitidos' },
      ],
      'archivados': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Archivados' },
      ],
      'busqueda-avanzada': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Búsqueda Avanzada' },
      ],
      'cargar-recibidos': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Cargar Recibidos' },
      ],
      'cargar-transmitidos': [
        { label: 'Mesa de Trabajo', href: '/mesa-trabajo' },
        { label: 'Cargar Transmitidos' },
      ],
    };

    return breadcrumbsMap[activeSection] || [];
  }, [activeSection]);

  return {
    activeSection,
    setActiveSection,
    getBreadcrumbs,
  };
};

export default useMesaTrabajoPage;