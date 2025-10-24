import { useState } from 'react';

export const useSidebar = (secciones, alCambiarSeccion, alCerrar) => {
  // Estado para controlar qué secciones están expandidas
  const [expandido, setExpandido] = useState(
    secciones.reduce((acumulador, seccion) => ({ 
      ...acumulador, 
      [seccion.id]: true 
    }), {})
  );

  // Función para alternar el estado expandido/colapsado de una sección
  const alternarSeccion = (id) => {
    setExpandido((previo) => ({ 
      ...previo, 
      [id]: !previo[id] 
    }));
  };

  // Función para manejar el click en un item del sidebar
  const manejarClick = (id) => {
    alCambiarSeccion(id);
    
    if (window.innerWidth < 900) {
      alCerrar();
    }
  };

  return {
    expandido,
    alternarSeccion,
    manejarClick,
  };
};