// src/routes/agendamentoRoutes.js
const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamentoController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/disponibilidade', AgendamentoController.disponibilidade);

// Rotas privadas
router.get('/', authMiddleware, AgendamentoController.index);
router.post('/', authMiddleware, AgendamentoController.store);
router.put('/:id/status', authMiddleware, AgendamentoController.updateStatus);
router.delete('/:id', authMiddleware, AgendamentoController.cancel);

module.exports = router;