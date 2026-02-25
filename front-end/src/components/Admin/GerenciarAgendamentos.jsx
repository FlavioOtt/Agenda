// src/components/Admin/GerenciarAgendamentos.jsx
import React, { useState, useEffect } from 'react';
import agendamentoService from '../../services/agendamentoService';
import styles from './GerenciarAgendamentos.module.css';

const GerenciarAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadAgendamentos();
    }, []);

    const loadAgendamentos = async () => {
        try {
            setLoading(true);
            const data = await agendamentoService.getAll();
            setAgendamentos(data);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAgendamentos = agendamentos.filter(apt => {
        const matchesFilter = filter === 'todos' || apt.status === filter;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            (apt.cliente_nome || '').toLowerCase().includes(searchLower) ||
            (apt.servico_nome || '').toLowerCase().includes(searchLower) ||
            (apt.profissional_nome || '').toLowerCase().includes(searchLower);
        return matchesFilter && matchesSearch;
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            await agendamentoService.updateStatus(id, newStatus);
            alert(`Status alterado para ${newStatus}`);
            loadAgendamentos();
        } catch (error) {
            alert('Erro ao alterar status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
            try {
                await agendamentoService.cancel(id);
                alert('Agendamento cancelado');
                loadAgendamentos();
            } catch (error) {
                alert('Erro ao cancelar');
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Agendamentos</h1>
                    <p>Gerencie todos os agendamentos do salão</p>
                </div>
            </div>

            {/* Filtros */}
            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <i className="fa-solid fa-search"></i>
                    <input
                        type="text"
                        placeholder="Buscar cliente ou serviço..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.filterTabs}>
                    <button
                        className={`${styles.filterTab} ${filter === 'todos' ? styles.active : ''}`}
                        onClick={() => setFilter('todos')}
                    >
                        Todos
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'pendente' ? styles.active : ''}`}
                        onClick={() => setFilter('pendente')}
                    >
                        Pendentes
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'confirmado' ? styles.active : ''}`}
                        onClick={() => setFilter('confirmado')}
                    >
                        Confirmados
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'concluido' ? styles.active : ''}`}
                        onClick={() => setFilter('concluido')}
                    >
                        Concluídos
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'cancelado' ? styles.active : ''}`}
                        onClick={() => setFilter('cancelado')}
                    >
                        Cancelados
                    </button>
                </div>
            </div>

            {/* Tabela */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#D4AF37' }}></i>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Serviço</th>
                                <th>Profissional</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAgendamentos.map((apt) => (
                                <tr key={apt.id}>
                                    <td>
                                        <div className={styles.clienteInfo}>
                                            <span className={styles.clienteName}>{apt.cliente_nome || 'Cliente'}</span>
                                            <span className={styles.clienteTel}>{apt.cliente_telefone || '-'}</span>
                                        </div>
                                    </td>
                                    <td>{apt.servico_nome}</td>
                                    <td>{apt.profissional_nome}</td>
                                    <td>{formatDate(apt.data_hora)}</td>
                                    <td>{apt.data_hora.split('T')[1].slice(0, 5)}</td>
                                    <td>{formatCurrency(apt.valor_final)}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[apt.status]}`}>
                                            {apt.status === 'pendente' && 'Pendente'}
                                            {apt.status === 'confirmado' && 'Confirmado'}
                                            {apt.status === 'em_andamento' && 'Em Andamento'}
                                            {apt.status === 'concluido' && 'Concluído'}
                                            {apt.status === 'cancelado' && 'Cancelado'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {apt.status === 'pendente' && (
                                                <button
                                                    className={styles.confirmBtn}
                                                    onClick={() => handleStatusChange(apt.id, 'confirmado')}
                                                    title="Confirmar"
                                                >
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                            )}
                                            {apt.status === 'confirmado' && (
                                                <button
                                                    className={styles.completeBtn}
                                                    onClick={() => handleStatusChange(apt.id, 'concluido')}
                                                    title="Marcar como concluído"
                                                >
                                                    <i className="fa-solid fa-check-double"></i>
                                                </button>
                                            )}
                                            {(apt.status === 'pendente' || apt.status === 'confirmado') && (
                                                <button
                                                    className={styles.cancelBtn}
                                                    onClick={() => handleDelete(apt.id)}
                                                    title="Cancelar"
                                                >
                                                    <i className="fa-solid fa-times"></i>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredAgendamentos.length === 0 && !loading && (
                <div className={styles.empty}>
                    <i className="fa-solid fa-calendar-xmark"></i>
                    <p>Nenhum agendamento encontrado</p>
                </div>
            )}
        </div>
    );
};

export default GerenciarAgendamentos;