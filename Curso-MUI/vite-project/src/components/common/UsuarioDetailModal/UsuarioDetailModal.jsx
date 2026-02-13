// src/components/common/UsuarioDetailModal/UsuarioDetailModal.jsx
import React from 'react';
import { useUsuarioDetailModal } from './useUsuarioDetailModal';
import UsuarioDetailModalView from './UsuarioDetailModalView';

const UsuarioDetailModal = ({
  open,
  onClose,
  usuario,
  onRefresh,
}) => {
  const { isClosing, handleClose } = useUsuarioDetailModal(open, onClose);
  
  const [detailedUsuario, setDetailedUsuario] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Effect to fetch details when modal opens and usuario has mr
  React.useEffect(() => {
    const fetchDetails = async () => {
      if (open && usuario?.matriculaRevista) {
        setLoading(true);
        setError(null);
        try {
          // Import dynamic to avoid circular dependencies if any, though here it's clean
          const { usuariosService } = await import('../../../services/usuariosService');
          const data = await usuariosService.getDetalle(usuario.matriculaRevista);
          
          if (data.success && data.value) {
            setDetailedUsuario(data.value);
          } else {
            throw new Error(data.message || 'Error al obtener detalles');
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
          
          // Check for 409 Conflict (likely just a Person, not a system User)
          if (err.response && err.response.status === 409) {
             // Treat as success but with limited data
             // We can signal this via a specific property or state if we want to show a warning
             // For now, let's just fall back to basic user info and maybe add a flag
             setDetailedUsuario({
                 ...usuario,
                 isPersonaOnly: true // Custom flag to indicate this is not a full system user
             });
          } else {
             setError(err.message || 'Error de conexión');
          }
        } finally {
          setLoading(false);
        }
      } else if (open) {
          // Fallback if no MR but open (shouldn't happen ideally if data is consistent)
          setDetailedUsuario(usuario); 
      }
    };

    fetchDetails();
    
    // Cleanup on close
    if (!open) {
        setDetailedUsuario(null);
        setLoading(false);
        setError(null);
    }
  }, [open, usuario]);

  const handleRefreshClick = () => {
      // Re-trigger effect or extract logic
      const fetchDetails = async () => {
        if (usuario?.matriculaRevista) {
            setLoading(true);
            setError(null);
            try {
                const { usuariosService } = await import('../../../services/usuariosService');
                const data = await usuariosService.getDetalle(usuario.matriculaRevista);
                if (data.success && data.value) {
                    setDetailedUsuario(data.value);
                } else {
                    throw new Error(data.message || 'Error al obtener detalles');
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                if (err.response && err.response.status === 409) {
                    setDetailedUsuario({
                        ...usuario,
                        isPersonaOnly: true
                    });
                } else {
                    setError(err.message || 'Error de conexión');
                }
            } finally {
                setLoading(false);
            }
        }
      };
      fetchDetails();
  };


  return (
    <UsuarioDetailModalView
      open={open}
      isClosing={isClosing}
      onClose={handleClose}
      usuario={detailedUsuario || usuario} // Show basic info while loading if available, or detailed when ready
      loading={loading}
      error={error}
      onRefresh={handleRefreshClick}
    />
  );
};

export default UsuarioDetailModal;