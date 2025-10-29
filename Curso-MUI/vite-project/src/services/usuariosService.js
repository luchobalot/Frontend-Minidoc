// src/services/usuariosService.js
import { authApiClient } from './apiClient';

/**
 * Servicio para gestion de usuarios
 */
export const usuariosService = {
  /**
   * Obtener todos los usuarios
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
        matriculaRevista: null, // Se cargara despues
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
   * Obtener usuario por ID con todos los detalles
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
        cuerpo: user.cuerpo || 'N/A',
        escalafon: user.escalafon || 'N/A',
        tipoClasificacion: user.alcance || user.tipoClasificacion || 'N/A',
        confianza: user.confianza || false,
        superConfianza: user.superConfianza || false,
        fechaCreacion: user.fechaCreacion || user.createdAt,
        jerarquiaId: user.jerarquiaId || user.rankId,
        destinoId: user.destinoId || user.organizationId,
        nivelId: user.nivelId || user.levelId,
        alcanceId: user.alcanceId,
      };
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },

  /**
   * Obtener solo la matricula de un usuario (optimizado)
   */
  getMatricula: async (id) => {
    try {
      const response = await authApiClient.get(`/v1.0/users/${id}`);
      const user = response.data;
      return user.serviceNumber || user.ServiceNumber || user.matriculaRevista || user.MatriculaRevista || 'N/A';
    } catch (error) {
      console.error(`Error obteniendo matricula del usuario ${id}:`, error);
      return 'N/A';
    }
  },

  /**
   * Obtener matriculas de multiples usuarios en batch
   */
  getMatriculas: async (userIds) => {
    try {
      const matriculas = await Promise.all(
        userIds.map(id => usuariosService.getMatricula(id))
      );
      
      return userIds.reduce((acc, id, index) => {
        acc[id] = matriculas[index];
        return acc;
      }, {});
    } catch (error) {
      console.error('Error obteniendo matriculas:', error);
      return {};
    }
  },

  create: async (userData) => {
    try {
      const response = await authApiClient.post('/v1.0/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  },

  update: async (id, userData) => {
    try {
      const response = await authApiClient.put(`/v1.0/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

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