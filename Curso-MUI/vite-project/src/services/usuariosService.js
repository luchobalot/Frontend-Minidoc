// src/services/usuariosService.js
import { authApiClient } from './apiClient';

export const usuariosService = {
  /**
   * Crear usuario basico (POST)
   */
  createUsuario: async (baseUrl, token, supervisorId, formData) => {
    try {
      const payload = {
        logon: formData.logon,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      };

      const response = await fetch(`${baseUrl}/users/${supervisorId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creando usuario');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createUsuario:', error);
      throw error;
    }
  },

  /**
   * Actualizar usuario con datos completos (PATCH)
   */
  updateUsuario: async (baseUrl, token, userId, formData) => {
    try {
      const payload = {
        firstName: formData.nombre,
        lastName: formData.apellido,
        organization: 'Armada Argentina',
        serviceNumber: formData.matriculaRevista || '',
        rank: formData.jerarquia || '',
        contactNumber: formData.contactNumber || '',
        remarks: formData.remarks || '',
      };

      const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error actualizando usuario');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en updateUsuario:', error);
      throw error;
    }
  },

  /**
   * Obtener todos los usuarios (para listar)
   */
  getAll: async (params = {}) => {
    try {
      const { page = 1, limit = 10, search = '', orderBy = 'apellido', order = 'asc' } = params;
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        orderBy,
        order,
      });

      const response = await authApiClient.get(`/v1.0/users?${queryParams}`);
      
      const apiData = response.data;
      const usuariosArray = apiData.items || [];

      const usuariosMapeados = usuariosArray.map(user => ({
        id: user.id,
        matriculaRevista: null,
        apellido: user.apellido || 'N/A',
        nombre: user.nombre || 'N/A',
        logon: user.userName || 'N/A',
        jerarquia: user.jerarquia || 'N/A',
        destino: user.destino || 'N/A',
        email: user.email,
        nivel: user.nivel,
        organizacion: user.organizacion,
      }));

      return {
        data: usuariosMapeados,
        metadata: {
          total: apiData.totalCount || 0,
          page: apiData.pageNumber || page,
          limit: apiData.pageSize || limit,
          totalPages: Math.ceil((apiData.totalCount || 0) / (apiData.pageSize || limit)),
        }
      };
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  /**
   * Obtener usuario por ID
   */
  getById: async (id) => {
    try {
      const response = await authApiClient.get(`/v1.0/users/${id}`);
      const user = response.data;
      
      return {
        id: user.id || user.Id,
        matriculaRevista: user.serviceNumber || user.ServiceNumber || user.matriculaRevista || user.MatriculaRevista || 'N/A',
        apellido: user.apellido || user.lastName || user.LastName || user.Apellido || 'N/A',
        nombre: user.nombre || user.firstName || user.FirstName || user.Nombre || 'N/A',
        logon: user.userName || user.UserName || 'N/A',
        jerarquia: user.jerarquia || user.rank || user.Rank || 'N/A',
        destino: user.destino || user.organization || user.Organization || 'N/A',
        email: user.email || user.Email || 'N/A',
        nroContacto: user.nroContacto || user.contactNumber || user.ContactNumber || 'N/A',
        observaciones: user.observaciones || user.remarks || user.Remarks || 'N/A',
        organizacion: user.organizacion || user.organization || user.Organization || 'N/A',
        nivel: user.nivel || user.level || user.Level || 'N/A',
        confianza: user.confianza || false,
        superConfianza: user.superConfianza || false,
        fechaCreacion: user.fechaCreacion || user.createdAt,
      };
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },

  /**
   * Eliminar usuario
   */
  delete: async (id) => {
    try {
      const response = await authApiClient.delete(`/v1.0/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  },
};