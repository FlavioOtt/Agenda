// src/controllers/profissionalController.js
const db = require('../config/database');

const ProfissionalController = {
  // Listar profissionais (público)
  async index(req, res) {
    const sql = 'SELECT id, nome, especialidade, foto FROM profissionais WHERE ativo = 1 ORDER BY nome';
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar profissionais' });
      }
      res.json(rows);
    });
  },

  // Listar todos os profissionais (admin)
  async indexAll(req, res) {
    const sql = 'SELECT * FROM profissionais ORDER BY nome';
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar profissionais' });
      }
      res.json(rows);
    });
  },

  // Buscar profissional por ID
  async show(req, res) {
    const { id } = req.params;
    const sql = 'SELECT * FROM profissionais WHERE id = ?';
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar profissional' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Profissional não encontrado' });
      }
      res.json(row);
    });
  },

  // Criar profissional (admin)
  async store(req, res) {
    const { nome, especialidade, biografia, foto, telefone, email } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const sql = `
      INSERT INTO profissionais (nome, especialidade, biografia, foto, telefone, email)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [nome, especialidade || null, biografia || null, foto || null, telefone || null, email || null], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar profissional' });
      }
      res.status(201).json({ success: true, id: this.lastID });
    });
  },

  // Atualizar profissional (admin)
  async update(req, res) {
    const { id } = req.params;
    const { nome, especialidade, biografia, foto, telefone, email, ativo } = req.body;

    const sql = `
      UPDATE profissionais 
      SET nome = ?, especialidade = ?, biografia = ?, foto = ?, telefone = ?, email = ?, ativo = ?
      WHERE id = ?
    `;

    db.run(sql, [nome, especialidade, biografia, foto, telefone, email, ativo, id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar' });
      }
      res.json({ success: true });
    });
  },

  // Deletar profissional (admin)
  async delete(req, res) {
    const { id } = req.params;
    const sql = 'DELETE FROM profissionais WHERE id = ?';

    db.run(sql, [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao excluir' });
      }
      res.json({ success: true });
    });
  }
};

module.exports = ProfissionalController;