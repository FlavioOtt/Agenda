// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const AuthController = {
    // Login
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
        }

        const sql = 'SELECT * FROM usuarios WHERE email = ? AND ativo = 1';

        db.get(sql, [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role, nome: user.nome },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    nome: user.nome,
                    role: user.role,
                    email: user.email
                }
            });
        });
    },

    // Registro de cliente
    async register(req, res) {
        const { nome, email, telefone, password } = req.body;

        if (!nome || !email || !password) {
            return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
      INSERT INTO usuarios (nome, email, telefone, password, role)
      VALUES (?, ?, ?, ?, 'cliente')
    `;

        db.run(sql, [nome, email, telefone || null, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ error: 'E-mail já cadastrado' });
                }
                return res.status(500).json({ error: 'Erro ao criar usuário' });
            }

            const token = jwt.sign(
                { id: this.lastID, email, role: 'cliente', nome },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(201).json({
                success: true,
                token,
                user: { id: this.lastID, nome, email, role: 'cliente' }
            });
        });
    },

    // Pegar dados do usuário logado
    async me(req, res) {
        const sql = 'SELECT id, nome, email, telefone, role, created_at FROM usuarios WHERE id = ?';

        db.get(sql, [req.user.id], (err, user) => {
            if (err || !user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json(user);
        });
    }
};

module.exports = AuthController;