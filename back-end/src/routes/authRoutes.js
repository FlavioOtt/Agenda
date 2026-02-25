// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Rotas públicas
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// Rota privada
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;