// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import HomePage from './components/Home/HomePage';
import AgendamentoPage from './components/Agendamento/AgendamentoPage';
import MeusAgendamentosPage from './components/Agendamento/MeusAgendamentosPage';
import LoginAdmin from './components/Admin/LoginAdmin';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import GerenciarAgendamentos from './components/Admin/GerenciarAgendamentos';
import GerenciarServicos from './components/Admin/GerenciarServicos';
import GerenciarProfissionais from './components/Admin/GerenciarProfissionais';
import Relatorios from './components/Admin/Relatorios';
import GerenciarClientes from './components/Admin/GerenciarClientes';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Rotas Públicas */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/agendamento" element={<AgendamentoPage />} />
                        <Route path="/meus-agendamentos" element={<MeusAgendamentosPage />} />

                        {/* Login Admin */}
                        <Route path="/admin/login" element={<LoginAdmin />} />

                        {/* Rotas Admin Protegidas */}
                        <Route path="/admin" element={
                            <PrivateRoute>
                                <AdminLayout />
                            </PrivateRoute>
                        }>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="agendamentos" element={<GerenciarAgendamentos />} />
                            <Route path="servicos" element={<GerenciarServicos />} />
                            <Route path="profissionais" element={<GerenciarProfissionais />} />
                            <Route path="clientes" element={<GerenciarClientes />} />
                            <Route path="relatorios" element={<Relatorios />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;