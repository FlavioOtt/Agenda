// src/controllers/servicoController.js
const db = require('../config/database');

const ServicoController = {
  // Listar serviços (público)
  async index(req, res) {
    const sql = 'SELECT * FROM servicos WHERE ativo = 1 ORDER BY categoria, nome';
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar serviços' });
      }
      res.json(rows);
    });
  },

  // Listar todos os serviços (admin)
  async indexAll(req, res) {
    const sql = 'SELECT * FROM servicos ORDER BY categoria, nome';
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar serviços' });
      }
      res.json(rows);
    });
  },

  // Buscar serviço por ID
  async show(req, res) {
    const { id } = req.params;
    const sql = 'SELECT * FROM servicos WHERE id = ?';
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar serviço' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Serviço não encontrado' });
      }
      res.json(row);
    });
  },

  // Criar serviço (admin)
  async store(req, res) {
    const { nome, descricao, duracao_minutos, preco, categoria, imagem } = req.body;

    if (!nome || !duracao_minutos || !preco || !categoria) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }

    const sql = `
      INSERT INTO servicos (nome, descricao, duracao_minutos, preco, categoria, imagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [nome, descricao || null, duracao_minutos, preco, categoria, imagem || null], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar serviço' });
      }
      res.status(201).json({ success: true, id: this.lastID });
    });
  },

  // Atualizar serviço (admin)
  async update(req, res) {
    const { id } = req.params;
    const { nome, descricao, duracao_minutos, preco, categoria, imagem, ativo } = req.body;

    const sql = `
      UPDATE servicos 
      SET nome = ?, descricao = ?, duracao_minutos = ?, preco = ?, categoria = ?, imagem = ?, ativo = ?
      WHERE id = ?
    `;

    db.run(sql, [nome, descricao, duracao_minutos, preco, categoria, imagem, ativo, id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Serviço não encontrado' });
      }
      res.json({ success: true });
    });
  },

  // Deletar serviço (admin)
  async delete(req, res) {
    const { id } = req.params;
    const sql = 'DELETE FROM servicos WHERE id = ?';

    db.run(sql, [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao excluir' });
      }
      res.json({ success: true });
    });
  }
};

module.exports = ServicoController;