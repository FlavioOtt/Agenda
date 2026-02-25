// src/routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clienteController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Rotas admin
router.get('/', authMiddleware, adminMiddleware, ClienteController.index);
router.get('/estatisticas', authMiddleware, adminMiddleware, ClienteController.estatisticas);
router.get('/:id', authMiddleware, adminMiddleware, ClienteController.show);
router.put('/:id', authMiddleware, ClienteController.update);
router.put('/:id/toggle-ativo', authMiddleware, adminMiddleware, ClienteController.toggleAtivo);

module.exports = router;