// src/services/usuariosService.js
import { authApiClient } from './apiClient';

export const usuariosService = {
  /**
   * BFF: usuarios del destino del usuario logueado
   * GET /api/v1/usuarios/midestino
   * Respuesta esperada: { value: [...] }
   */
  getMiDestino: async () => {
    const response = await authApiClient.get('/api/v1/usuarios/midestino');
    return response.data?.value ?? [];
  },

  /**
   * Obtener usuario (personal) por ID (lo dejo por compatibilidad)
   */
  getById: async (id) => {
    const response = await authApiClient.get(`/v1.0/personal/${id}`);
    return response.data;
  },

  /**
   * Obtener detalle completo de un usuario por Matricula de Revista
   * GET /api/v1/usuarios/{mr}/detalle
   */
  getDetalle: async (matriculaRevista) => {
    const response = await authApiClient.get(`/api/v1/usuarios/${matriculaRevista}/detalle`);
    return response.data;
  },
};
