// src/components/Agendamentos/MeusAgendamentosPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import agendamentoService from '../../services/agendamentoService';
import authService from '../../services/authService';
import styles from './MeusAgendamentosPage.module.css';

const MeusAgendamentosPage = () => {
    const [activeTab, setActiveTab] = useState('proximos');
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const agendamentosFuturos = agendamentos.filter(apt =>
        ['pendente', 'confirmado'].includes(apt.status)
    );

    const agendamentosPassados = agendamentos.filter(apt =>
        ['concluido', 'cancelado'].includes(apt.status)
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleCancel = async (id) => {
        if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
            try {
                await agendamentoService.cancel(id);
                alert('Agendamento cancelado com sucesso!');
                loadAgendamentos();
            } catch (error) {
                alert('Erro ao cancelar agendamento.');
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await agendamentoService.updateStatus(id, newStatus);
            alert(`Status alterado para ${newStatus}`);
            loadAgendamentos();
        } catch (error) {
            alert('Erro ao atualizar status.');
        }
    };

    const renderAgendamentoCard = (agendamento, isHistorico = false) => (
        <div key={agendamento.id} className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.serviceInfo}>
                    <h3>{agendamento.servico_nome}</h3>
                    <span className={styles.professional}>
                        <i className="fa-solid fa-user"></i> {agendamento.profissional_nome}
                    </span>
                </div>
                <div className={`${styles.status} ${styles[agendamento.status]}`}>
                    {agendamento.status === 'pendente' && 'Pendente'}
                    {agendamento.status === 'confirmado' && 'Confirmado'}
                    {agendamento.status === 'em_andamento' && 'Em Andamento'}
                    {agendamento.status === 'concluido' && 'Concluído'}
                    {agendamento.status === 'cancelado' && 'Cancelado'}
                </div>
            </div>

            <div className={styles.cardBody}>
                <div className={styles.detail}>
                    <i className="fa-regular fa-calendar"></i>
                    <span>{formatDate(agendamento.data_hora)}</span>
                </div>
                <div className={styles.detail}>
                    <i className="fa-regular fa-clock"></i>
                    <span>{agendamento.data_hora.split('T')[1].slice(0, 5)}</span>
                </div>
                <div className={styles.detail}>
                    <i className="fa-solid fa-tag"></i>
                    <span>R$ {agendamento.valor_final?.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>

            {!isHistorico && (
                <div className={styles.cardFooter}>
                    {agendamento.status === 'confirmado' && (
                        <button
                            className={styles.rescheduleBtn}
                            onClick={() => handleStatusChange(agendamento.id, 'concluido')}
                        >
                            <i className="fa-solid fa-check"></i>
                            Marcar Concluído
                        </button>
                    )}
                    <button
                        className={styles.cancelBtn}
                        onClick={() => handleCancel(agendamento.id)}
                    >
                        <i className="fa-solid fa-times"></i>
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );

    // Verificar autenticação
    const user = authService.getCurrentUser();
    const isAdmin = user?.role === 'admin';

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link to="/" className={styles.logo}>
                        Espaço<span>Beleza</span>
                    </Link>
                    <nav className={styles.nav}>
                        <Link to="/">Início</Link>
                        <Link to="/meus-agendamentos" className={styles.activeLink}>Meus Agendamentos</Link>
                        {isAdmin && <Link to="/admin/dashboard">Painel Admin</Link>}
                    </nav>
                    <button onClick={() => { authService.logout(); navigate('/'); }} className={styles.ctaButton}>
                        Sair
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.pageHeader}>
                    <h1>Meus Agendamentos</h1>
                    <p>Gerencie seus horários e histórico de serviços</p>
                </div>

                {/* Abas */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'proximos' ? styles.active : ''}`}
                        onClick={() => setActiveTab('proximos')}
                    >
                        <i className="fa-regular fa-calendar-check"></i>
                        Próximos
                        <span className={styles.badge}>{agendamentosFuturos.length}</span>
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'historico' ? styles.active : ''}`}
                        onClick={() => setActiveTab('historico')}
                    >
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        Histórico
                    </button>
                </div>

                {/* Lista de Agendamentos */}
                <div className={styles.content}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#D4AF37' }}></i>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'proximos' && (
                                <div className={styles.agendamentosList}>
                                    {agendamentosFuturos.length > 0 ? (
                                        agendamentosFuturos.map((agendamento) =>
                                            renderAgendamentoCard(agendamento, false)
                                        )
                                    ) : (
                                        <div className={styles.emptyState}>
                                            <i className="fa-regular fa-calendar-xmark"></i>
                                            <h3>Nenhum agendamento futuro</h3>
                                            <p>Agende um horário e venha nos visitar!</p>
                                            <Link to="/agendamento" className={styles.emptyBtn}>
                                                Agendar Agora
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'historico' && (
                                <div className={styles.agendamentosList}>
                                    {agendamentosPassados.length > 0 ? (
                                        agendamentosPassados.map((agendamento) =>
                                            renderAgendamentoCard(agendamento, true)
                                        )
                                    ) : (
                                        <div className={styles.emptyState}>
                                            <i className="fa-solid fa-clock"></i>
                                            <h3>Nenhum histórico</h3>
                                            <p>Seu histórico de serviços aparecerá aqui.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Espaço Beleza. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default MeusAgendamentosPage;