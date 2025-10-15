// src/services/authService.js
import { authApiClient } from './apiClient';

/**
 * Login (autenticacion con API JWT - Puerto 7006)
 * @param {string} logon - Nombre de usuario
 * @param {string} password - Contrasena
 * @returns {Promise<Object>} - Datos de autenticacion (token, userId, fechaExpiracion)
 */
export const login = async (logon, password) => {
  try {
    const response = await authApiClient.post('/v1.0/users/authenticate', {
      logon,
      password,
      instanceUri: '/api/v1.0/users/authenticate'
    });

    console.log('Login exitoso:', { 
      userId: response.data.userId, 
      fechaExpiracion: response.data.fechaExpiracion 
    });

    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

/**
 * Obtener datos del usuario por ID (desde API JWT)
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Datos del usuario
 */
export const getUserData = async (userId) => {
  try {
    const response = await authApiClient.get(`/v1.0/users/${userId}`);
    console.log('Datos de usuario obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    throw error;
  }
};