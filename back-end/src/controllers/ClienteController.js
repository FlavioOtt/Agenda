// src/controllers/clienteController.js
const db = require('../config/database');

const ClienteController = {
  // Listar clientes (admin)
  async index(req, res) {
    const sql = `
      SELECT u.id, u.nome, u.email, u.telefone, u.cpf, u.ativo, u.created_at,
             COUNT(a.id) as total_agendamentos
      FROM usuarios u
      LEFT JOIN agendamentos a ON u.id = a.cliente_id
      WHERE u.role = 'cliente'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar clientes' });
      }
      res.json(rows);
    });
  },

  // Buscar cliente por ID (admin)
  async show(req, res) {
    const { id } = req.params;
    const sql = 'SELECT id, nome, email, telefone, cpf, ativo, created_at FROM usuarios WHERE id = ? AND role = ?';
    
    db.get(sql, [id, 'cliente'], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar cliente' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(row);
    });
  },

  // Atualizar cliente
  async update(req, res) {
    const { id } = req.params;
    const { nome, telefone, cpf } = req.body;

    // Verificar se o usuário é o próprio cliente ou admin
    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    const sql = `
      UPDATE usuarios 
      SET nome = ?, telefone = ?, cpf = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND role = 'cliente'
    `;

    db.run(sql, [nome, telefone, cpf, id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar' });
      }
      res.json({ success: true });
    });
  },

  // Desativar cliente (admin)
  async toggleAtivo(req, res) {
    const { id } = req.params;
    const { ativo } = req.body;

    const sql = 'UPDATE usuarios SET ativo = ? WHERE id = ? AND role = ?';

    db.run(sql, [ativo ? 1 : 0, id, 'cliente'], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar status' });
      }
      res.json({ success: true });
    });
  },

  // Estatísticas de clientes (admin)
  async estatisticas(req, res) {
    const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN ativo = 1 THEN 1 ELSE 0 END) as ativos,
        SUM(CASE WHEN ativo = 0 THEN 1 ELSE 0 END) as inativos,
        SUM(CASE WHEN created_at >= date('now', '-30 days') THEN 1 ELSE 0 END) as novos_mes
      FROM usuarios 
      WHERE role = 'cliente'
    `;

    db.get(sql, [], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
      }
      res.json(row);
    });
  }
};

module.exports = ClienteController;