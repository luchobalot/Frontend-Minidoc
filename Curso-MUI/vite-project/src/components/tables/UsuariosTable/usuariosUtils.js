// src/components/tables/UsuariosTable/usuariosUtils.js

export const getNivelConfig = (nivelString) => {
  if (!nivelString) {
    return { 
      label: 'Sin Nivel', 
      color: '#6B7280', 
      bgColor: '#F3F4F6', 
      borderColor: '#D1D5DB',
    };
  }

  const nivelLower = nivelString.toLowerCase();
  
  if (nivelLower.includes('dios')) {
    return { 
      label: 'DIOS', 
      color: '#7C3AED', 
      bgColor: '#F3E8FF', 
      borderColor: '#C084FC',
    };
  }
  
  if (nivelLower.includes('super') || nivelLower.includes('superadministrador')) {
    return { 
      label: 'Super Admin', 
      color: '#DC2626', 
      bgColor: '#FEE2E2', 
      borderColor: '#FCA5A5',
    };
  }
  
  if (nivelLower.includes('administrador')) {
    return { 
      label: 'Administrador', 
      color: '#EA580C', 
      bgColor: '#FED7AA', 
      borderColor: '#FDBA74',
    };
  }
  
  if (nivelLower.includes('operador')) {
    return { 
      label: 'Operador', 
      color: '#059669', 
      bgColor: '#D1FAE5', 
      borderColor: '#6EE7B7',
    };
  }

  return { 
    label: nivelString, 
    color: '#6B7280', 
    bgColor: '#F3F4F6', 
    borderColor: '#D1D5DB',
  };
};