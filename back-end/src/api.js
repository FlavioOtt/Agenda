const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/clientes', clienteRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API do Salão Online funcionando!' });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

module.exports = app;
