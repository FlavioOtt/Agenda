// src/components/Admin/GerenciarClientes.jsx
import React, { useState, useEffect } from 'react';
import clienteService from '../../services/clienteService';
import styles from './GerenciarClientes.module.css';

const GerenciarClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('todos');
    const [estatisticas, setEstatisticas] = useState({
        total: 0,
        ativos: 0,
        inativos: 0,
        novos_mes: 0,
    });

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            setLoading(true);

            // Buscar clientes e estatísticas em paralelo
            const [clientesData, statsData] = await Promise.all([
                clienteService.getAll(),
                clienteService.getEstatisticas(),
            ]);

            setClientes(clientesData);
            setEstatisticas({
                total: statsData?.total || 0,
                ativos: statsData?.ativos || 0,
                inativos: statsData?.inativos || 0,
                novos_mes: statsData?.novos_mes || 0,
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClientes = clientes.filter(cliente => {
        const matchesFilter = filter === 'todos' ||
            (filter === 'ativos' && cliente.ativo === 1) ||
            (filter === 'inativos' && cliente.ativo === 0);

        const matchesSearch =
            (cliente.nome || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (cliente.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (cliente.telefone || '').includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    const handleToggleAtivo = async (id, ativo) => {
        try {
            await clienteService.toggleAtivo(id, ativo === 1 ? false : true);
            alert(`Cliente ${ativo === 1 ? 'desativado' : 'ativado'} com sucesso`);
            loadClientes();
        } catch (error) {
            alert('Erro ao atualizar status');
        }
    };

    const handleWhatsApp = (telefone) => {
        if (!telefone) return;
        const cleanPhone = telefone.replace(/\D/g, '');
        window.open(`https://wa.me/55${cleanPhone}`, '_blank');
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Clientes</h1>
                    <p>Gerencie os clientes do salão</p>
                </div>
            </div>

            {/* Estatísticas */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#D4AF3720', color: '#D4AF37' }}>
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{estatisticas.total}</span>
                        <span className={styles.statLabel}>Total de Clientes</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#2ECC7120', color: '#2ECC71' }}>
                        <i className="fa-solid fa-user-check"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{estatisticas.ativos}</span>
                        <span className={styles.statLabel}>Clientes Ativos</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#E74C3C20', color: '#E74C3C' }}>
                        <i className="fa-solid fa-user-slash"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{estatisticas.inativos}</span>
                        <span className={styles.statLabel}>Inativos</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#3498DB20', color: '#3498DB' }}>
                        <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{estatisticas.novos_mes}</span>
                        <span className={styles.statLabel}>Novos (Mês)</span>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <i className="fa-solid fa-search"></i>
                    <input
                        type="text"
                        placeholder="Buscar por nome, e-mail ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.filterTabs}>
                    <button
                        className={`${styles.filterTab} ${filter === 'todos' ? styles.active : ''}`}
                        onClick={() => setFilter('todos')}
                    >
                        Todos ({estatisticas.total})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'ativos' ? styles.active : ''}`}
                        onClick={() => setFilter('ativos')}
                    >
                        Ativos ({estatisticas.ativos})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'inativos' ? styles.active : ''}`}
                        onClick={() => setFilter('inativos')}
                    >
                        Inativos ({estatisticas.inativos})
                    </button>
                </div>
            </div>

            {/* Tabela de Clientes */}
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
                                <th>Contato</th>
                                <th>Agendamentos</th>
                                <th>Cadastro</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>
                                        <div className={styles.clienteInfo}>
                                            <div className={styles.avatar}>
                                                {(cliente.nome || 'C').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <span className={styles.clienteName}>{cliente.nome}</span>
                                                <span className={styles.clienteEmail}>{cliente.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.contato}>
                                            <span>{cliente.telefone || '-'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.agendamentosCount}>
                                            {cliente.total_agendamentos || 0}
                                        </span>
                                    </td>
                                    <td>{formatDate(cliente.created_at)}</td>
                                    <td>
                                        <span className={`${styles.status} ${cliente.ativo === 1 ? styles.ativo : styles.inativo}`}>
                                            {cliente.ativo === 1 ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {cliente.telefone && (
                                                <button
                                                    className={styles.whatsappBtn}
                                                    onClick={() => handleWhatsApp(cliente.telefone)}
                                                    title="Enviar WhatsApp"
                                                >
                                                    <i className="fa-brands fa-whatsapp"></i>
                                                </button>
                                            )}
                                            <button
                                                className={styles.editBtn}
                                                title="Editar"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button
                                                className={`${styles.editBtn} ${cliente.ativo === 1 ? '' : styles.activate}`}
                                                onClick={() => handleToggleAtivo(cliente.id, cliente.ativo)}
                                                title={cliente.ativo === 1 ? 'Desativar' : 'Ativar'}
                                            >
                                                <i className={`fa-solid ${cliente.ativo === 1 ? 'fa-user-slash' : 'fa-user-check'}`}></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredClientes.length === 0 && !loading && (
                <div className={styles.empty}>
                    <i className="fa-solid fa-users-slash"></i>
                    <p>Nenhum cliente encontrado</p>
                </div>
            )}
        </div>
    );
};

export default GerenciarClientes;