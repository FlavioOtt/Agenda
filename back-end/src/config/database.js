// src/config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../models/database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco SQLite');
    initTables();
  }
});

function initTables() {
  db.serialize(() => {
    // Tabela de usuários (admin e clientes)
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        telefone TEXT,
        cpf TEXT,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'cliente' CHECK(role IN ('admin', 'cliente')),
        ativo INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de profissionais
    db.run(`
      CREATE TABLE IF NOT EXISTS profissionais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        especialidade TEXT,
        biografia TEXT,
        foto TEXT,
        telefone TEXT,
        email TEXT,
        ativo INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de serviços
    db.run(`
      CREATE TABLE IF NOT EXISTS servicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        duracao_minutos INTEGER NOT NULL,
        preco REAL NOT NULL,
        categoria TEXT CHECK(categoria IN ('cabelo', 'unha', 'maquiagem', 'spa', 'outro')),
        imagem TEXT,
        ativo INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de agendamentos
    db.run(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        profissional_id INTEGER NOT NULL,
        servico_id INTEGER NOT NULL,
        data_hora DATETIME NOT NULL,
        data_fim DATETIME NOT NULL,
        status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'confirmado', 'em_andamento', 'concluido', 'cancelado')),
        valor_final REAL,
        observacoes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
        FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
        FOREIGN KEY (servico_id) REFERENCES servicos(id)
      )
    `);

    // Tabela de avaliações
    db.run(`
      CREATE TABLE IF NOT EXISTS avaliacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agendamento_id INTEGER NOT NULL,
        nota INTEGER CHECK(nota >= 1 AND nota <= 5),
        comentario TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (agendamento_id) REFERENCES agendamentos(id)
      )
    `);

    // Inserir admin padrão
    const bcrypt = require('bcryptjs');
    const adminPassword = bcrypt.hashSync('admin123', 10);
    
    db.run(`
      INSERT OR IGNORE INTO usuarios (nome, email, password, role)
      VALUES ('Administrador', 'admin@salao.com.br', ?, 'admin')
    `, [adminPassword]);

    console.log('Tabelas criadas com sucesso!');
  });
}

module.exports = db;