// src/services/usuariosService.js
import { authApiClient } from './apiClient';

export const usuariosService = {

  /**
   * Obtener usuario (personal) por ID
   */
  getById: async (id) => {
    try {

      const response = await authApiClient.get(`/v1.0/personal/${id}`);
      return response.data;

    } catch (error) {
      console.error('Error obteniendo personal por ID:', error);
      throw error;
    }
  },
};
