// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const data = await authService.login(email, password);

            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.error || 'Erro ao fazer login' };
            }
        } catch (err) {
            const message = err.response?.data?.error || 'Erro ao conectar com o servidor';
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await authService.register(userData);

            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.error || 'Erro ao criar conta' };
            }
        } catch (err) {
            const message = err.response?.data?.error || 'Erro ao conectar com o servidor';
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
};

export default AuthContext;