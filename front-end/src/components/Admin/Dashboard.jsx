// src/components/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import agendamentoService from '../../services/agendamentoService';
import clienteService from '../../services/clienteService';
import servicoService from '../../services/servicoService';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        agendamentosHoje: 0,
        clientes: 0,
        receitaMes: 0,
        notaMedia: 0,
    });
    const [agendamentosHoje, setAgendamentosHoje] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            // Buscar todos os agendamentos
            const agendamentos = await agendamentoService.getAll();

            // Buscar clientes
            const clientes = await clienteService.getAll();

            // Calcular estatísticas
            const hoje = new Date().toISOString().split('T')[0];
            const agendamentosHoje = agendamentos.filter(a =>
                a.data_hora.split('T')[0] === hoje
            );

            const receitaMes = agendamentos
                .filter(a => a.status === 'concluido')
                .reduce((acc, a) => acc + (a.valor_final || 0), 0);

            setStats({
                agendamentosHoje: agendamentosHoje.length,
                clientes: clientes.length,
                receitaMes: receitaMes,
                notaMedia: 4.8,
            });

            setAgendamentosHoje(agendamentosHoje.slice(0, 5));
        } catch (error) {
            console.error('Erro ao carregar dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await agendamentoService.updateStatus(id, status);
            loadDashboard();
        } catch (error) {
            alert('Erro ao atualizar status');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#D4AF37' }}></i>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                <p>Visão geral do seu salão</p>
            </div>

            {/* Cards de Estatísticas */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#D4AF3720', color: '#D4AF37' }}>
                        <i className="fa-solid fa-calendar-check"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stats.agendamentosHoje}</span>
                        <span className={styles.statLabel}>Agendamentos Hoje</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#2ECC7120', color: '#2ECC71' }}>
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stats.clientes}</span>
                        <span className={styles.statLabel}>Clientes Cadastrados</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#3498DB20', color: '#3498DB' }}>
                        <i className="fa-solid fa-brazilian-real-sign"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{formatCurrency(stats.receitaMes)}</span>
                        <span className={styles.statLabel}>Receita do Mês</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E74C3C20', color: '#E74C3C' }}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{stats.notaMedia}</span>
                        <span className={styles.statLabel}>Avaliação Média</span>
                    </div>
                </div>
            </div>

            {/* Agendamentos do Dia */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Agendamentos de Hoje</h2>
                    <Link to="/admin/agendamentos" className={styles.viewAll}>Ver todos</Link>
                </div>

                {agendamentosHoje.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#757575' }}>
                        <i className="fa-solid fa-calendar-xmark" style={{ fontSize: '40px', color: '#E0E0E0', marginBottom: '10px' }}></i>
                        <p>Nenhum agendamento para hoje</p>
                    </div>
                ) : (
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <span>Cliente</span>
                            <span>Serviço</span>
                            <span>Profissional</span>
                            <span>Horário</span>
                            <span>Status</span>
                            <span>Ações</span>
                        </div>

                        {agendamentosHoje.map((apt) => (
                            <div key={apt.id} className={styles.tableRow}>
                                <span className={styles.cliente}>{apt.cliente_nome || 'Cliente'}</span>
                                <span>{apt.servico_nome}</span>
                                <span>{apt.profissional_nome}</span>
                                <span>{apt.data_hora.split('T')[1].slice(0, 5)}</span>
                                <span>
                                    <span className={`${styles.status} ${styles[apt.status]}`}>
                                        {apt.status === 'pendente' && 'Pendente'}
                                        {apt.status === 'confirmado' && 'Confirmado'}
                                        {apt.status === 'em_andamento' && 'Em Andamento'}
                                        {apt.status === 'concluido' && 'Concluído'}
                                        {apt.status === 'cancelado' && 'Cancelado'}
                                    </span>
                                </span>
                                <span>
                                    {apt.status === 'pendente' && (
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => handleStatusChange(apt.id, 'confirmado')}
                                            title="Confirmar"
                                        >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                    )}
                                    {apt.status === 'confirmado' && (
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => handleStatusChange(apt.id, 'concluido')}
                                            title="Concluir"
                                        >
                                            <i className="fa-solid fa-check-double"></i>
                                        </button>
                                    )}
                                    {(apt.status === 'pendente' || apt.status === 'confirmado') && (
                                        <button
                                            className={`${styles.actionBtn} ${styles.cancel}`}
                                            onClick={() => handleStatusChange(apt.id, 'cancelado')}
                                            title="Cancelar"
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;