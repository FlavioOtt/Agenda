// src/services/profissionalService.js
import api from './api';

export const profissionalService = {
  // Listar profissionais ativos (público)
  getAll: async () => {
    const response = await api.get('/profissionais');
    return response.data;
  },

  // Buscar por ID
  getById: async (id) => {
    const response = await api.get(`/profissionais/${id}`);
    return response.data;
  },

  // Admin - Listar todos
  getAllAdmin: async () => {
    const response = await api.get('/profissionais/admin/todos');
    return response.data;
  },

  // Admin - Criar
  create: async (data) => {
    const response = await api.post('/profissionais', data);
    return response.data;
  },

  // Admin - Atualizar
  update: async (id, data) => {
    const response = await api.put(`/profissionais/${id}`, data);
    return response.data;
  },

  // Admin - Deletar
  delete: async (id) => {
    const response = await api.delete(`/profissionais/${id}`);
    return response.data;
  },
};

export default profissionalService;