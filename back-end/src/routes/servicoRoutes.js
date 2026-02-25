// src/routes/servicoRoutes.js
const express = require('express');
const router = express.Router();
const ServicoController = require('../controllers/servicoController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', ServicoController.index);
router.get('/:id', ServicoController.show);

// Rotas admin
router.get('/admin/todos', authMiddleware, adminMiddleware, ServicoController.indexAll);
router.post('/', authMiddleware, adminMiddleware, ServicoController.store);
router.put('/:id', authMiddleware, adminMiddleware, ServicoController.update);
router.delete('/:id', authMiddleware, adminMiddleware, ServicoController.delete);

module.exports = router;