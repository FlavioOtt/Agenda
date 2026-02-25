// src/services/servicoService.js
import api from './api';

export const servicoService = {
  // Listar serviços ativos (público)
  getAll: async () => {
    const response = await api.get('/servicos');
    return response.data;
  },

  // Buscar por ID
  getById: async (id) => {
    const response = await api.get(`/servicos/${id}`);
    return response.data;
  },

  // Admin - Listar todos
  getAllAdmin: async () => {
    const response = await api.get('/servicos/admin/todos');
    return response.data;
  },

  // Admin - Criar
  create: async (data) => {
    const response = await api.post('/servicos', data);
    return response.data;
  },

  // Admin - Atualizar
  update: async (id, data) => {
    const response = await api.put(`/servicos/${id}`, data);
    return response.data;
  },

  // Admin - Deletar
  delete: async (id) => {
    const response = await api.delete(`/servicos/${id}`);
    return response.data;
  },
};

export default servicoService;