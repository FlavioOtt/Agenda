// src/controllers/agendamentoController.js
const db = require('../config/database');

const AgendamentoController = {
  // Listar agendamentos (cliente: próprios, admin: todos)
  async index(req, res) {
    let sql;
    let params = [];

    if (req.user.role === 'admin') {
      sql = `
        SELECT a.*, u.nome as cliente_nome, u.telefone as cliente_telefone,
               p.nome as profissional_nome, s.nome as servico_nome, s.preco as servico_preco
        FROM agendamentos a
        JOIN usuarios u ON a.cliente_id = u.id
        JOIN profissionais p ON a.profissional_id = p.id
        JOIN servicos s ON a.servico_id = s.id
        ORDER BY a.data_hora DESC
      `;
    } else {
      sql = `
        SELECT a.*, p.nome as profissional_nome, s.nome as servico_nome, s.preco as servico_preco
        FROM agendamentos a
        JOIN profissionais p ON a.profissional_id = p.id
        JOIN servicos s ON a.servico_id = s.id
        WHERE a.cliente_id = ?
        ORDER BY a.data_hora DESC
      `;
      params = [req.user.id];
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
      }
      res.json(rows);
    });
  },

  // Criar agendamento
  async store(req, res) {
    const { servico_id, profissional_id, data_hora, observacoes } = req.body;
    const cliente_id = req.user.id;

    // Buscar duração do serviço
    db.get('SELECT duracao_minutos, preco FROM servicos WHERE id = ?', [servico_id], (err, servico) => {
      if (err || !servico) {
        return res.status(400).json({ error: 'Serviço não encontrado' });
      }

      const dataInicio = new Date(data_hora);
      const dataFim = new Date(dataInicio.getTime() + servico.duracao_minutos * 60000);

      const sql = `
        INSERT INTO agendamentos (cliente_id, profissional_id, servico_id, data_hora, data_fim, valor_final, observacoes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(sql, [cliente_id, profissional_id, servico_id, data_hora, dataFim.toISOString(), servico.preco, observacoes || null], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erro ao criar agendamento' });
        }

        res.status(201).json({
          success: true,
          id: this.lastID,
          message: 'Agendamento criado com sucesso'
        });
      });
    });
  },

  // Atualizar status
  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pendente', 'confirmado', 'em_andamento', 'concluido', 'cancelado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const sql = 'UPDATE agendamentos SET status = ? WHERE id = ?';

    db.run(sql, [status, id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar status' });
      }
      res.json({ success: true, message: 'Status atualizado' });
    });
  },

  // Cancelar agendamento
  async cancel(req, res) {
    const { id } = req.params;

    const sql = 'UPDATE agendamentos SET status = ? WHERE id = ? AND cliente_id = ?';

    db.run(sql, ['cancelado', id, req.user.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao cancelar' });
      }
      res.json({ success: true, message: 'Agendamento cancelado' });
    });
  },

  // Buscar disponibilidade
  async disponibilidade(req, res) {
    const { profissional_id, data } = req.query;

    // Buscar agendamentos do dia
    const sql = `
      SELECT data_hora, data_fim FROM agendamentos
      WHERE profissional_id = ? 
      AND date(data_hora) = ?
      AND status NOT IN ('cancelado')
    `;

    db.all(sql, [profissional_id, data], (err, agendamentos) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar disponibilidade' });
      }

      // Gerar horários disponíveis (9h às 19h, de 30 em 30 minutos)
      const horariosOcupados = agendamentos.map(a => {
        const inicio = new Date(a.data_hora);
        const fim = new Date(a.data_fim);
        const horarios = [];
        
        while (inicio < fim) {
          horarios.push(inicio.toTimeString().slice(0, 5));
          inicio.setMinutes(inicio.getMinutes() + 30);
        }
        return horarios;
      }).flat();

      const todosHorarios = [];
      for (let h = 9; h < 19; h++) {
        for (let m = 0; m < 60; m += 30) {
          const hora = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
          todosHorarios.push({
            hora,
            disponivel: !horariosOcupados.includes(hora)
          });
        }
      }

      res.json(todosHorarios);
    });
  }
};

module.exports = AgendamentoController;