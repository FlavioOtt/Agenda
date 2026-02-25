// src/routes/profissionalRoutes.js
const express = require('express');
const router = express.Router();
const ProfissionalController = require('../controllers/profissionalController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Rotas públicas
router.get('/', ProfissionalController.index);
router.get('/:id', ProfissionalController.show);

// Rotas admin
router.get('/admin/todos', authMiddleware, adminMiddleware, ProfissionalController.indexAll);
router.post('/', authMiddleware, adminMiddleware, ProfissionalController.store);
router.put('/:id', authMiddleware, adminMiddleware, ProfissionalController.update);
router.delete('/:id', authMiddleware, adminMiddleware, ProfissionalController.delete);

module.exports = router;