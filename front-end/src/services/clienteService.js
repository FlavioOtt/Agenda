// src/services/clienteService.js
import api from './api';

export const clienteService = {
  // Admin - Listar todos
  getAll: async () => {
    const response = await api.get('/clientes');
    return response.data;
  },

  // Admin - Estatísticas
  getEstatisticas: async () => {
    const response = await api.get('/clientes/estatisticas');
    return response.data;
  },

  // Admin - Buscar por ID
  getById: async (id) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },

  // Atualizar dados
  update: async (id, data) => {
    const response = await api.put(`/clientes/${id}`, data);
    return response.data;
  },

  // Admin - Ativar/desativar
  toggleAtivo: async (id, ativo) => {
    const response = await api.put(`/clientes/${id}/toggle-ativo`, { ativo });
    return response.data;
  },
};

export default clienteService;