// src/services/authService.js
import api from './api';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            return {
                success: true,
                token: response.data.token,
                user: response.data.user,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Erro ao fazer login',
            };
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return {
                success: true,
                token: response.data.token,
                user: response.data.user,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Erro ao criar conta',
            };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};

export default authService;