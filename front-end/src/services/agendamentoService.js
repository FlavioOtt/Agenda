// src/services/agendamentoService.js
import api from './api';

export const agendamentoService = {
  // Listar agendamentos do cliente ou todos (admin)
  getAll: async () => {
    const response = await api.get('/agendamentos');
    return response.data;
  },

  // Criar agendamento
  create: async (data) => {
    const response = await api.post('/agendamentos', data);
    return response.data;
  },

  // Buscar disponibilidade
  getDisponibilidade: async (profissionalId, data) => {
    const response = await api.get('/agendamentos/disponibilidade', {
      params: { profissional_id: profissionalId, data },
    });
    return response.data;
  },

  // Atualizar status
  updateStatus: async (id, status) => {
    const response = await api.put(`/agendamentos/${id}/status`, { status });
    return response.data;
  },

  // Cancelar agendamento
  cancel: async (id) => {
    const response = await api.delete(`/agendamentos/${id}`);
    return response.data;
  },
};

export default agendamentoService;