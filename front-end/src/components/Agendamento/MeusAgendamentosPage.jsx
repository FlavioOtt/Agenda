// src/components/Agendamentos/MeusAgendamentosPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MeusAgendamentosPage.module.css';

const MeusAgendamentosPage = () => {
  const [activeTab, setActiveTab] = useState('proximos');

  // Dados de exemplo (simulando dados da API)
  const agendamentosFuturos = [
    {
      id: 1,
      servico: 'Corte Feminino',
      profissional: 'Carla',
      data: '2024-12-20',
      hora: '14:00',
      valor: 80.00,
      status: 'confirmado',
    },
    {
      id: 2,
      servico: 'Manicure',
      profissional: 'João',
      data: '2024-12-22',
      hora: '10:00',
      valor: 40.00,
      status: 'confirmado',
    },
  ];

  const agendamentosPassados = [
    {
      id: 3,
      servico: 'Coloração',
      profissional: 'Carla',
      data: '2024-11-15',
      hora: '14:00',
      valor: 150.00,
      status: 'concluido',
    },
    {
      id: 4,
      servico: 'Escova',
      profissional: 'João',
      data: '2024-10-20',
      hora: '11:00',
      valor: 60.00,
      status: 'concluido',
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleCancel = (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      console.log('Cancelando agendamento:', id);
      // Aqui você faria a chamada à API
      alert('Agendamento cancelado com sucesso!');
    }
  };

  const handleReschedule = (id) => {
    // Redireciona para página de agendamento com o ID do agendamento
    console.log('Remarcar agendamento:', id);
    alert('Funcionalidade de remarcar em desenvolvimento!');
  };

  const renderAgendamentoCard = (agendamento, isHistorico = false) => (
    <div key={agendamento.id} className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.serviceInfo}>
          <h3>{agendamento.servico}</h3>
          <span className={styles.professional}>
            <i className="fa-solid fa-user"></i> {agendamento.profissional}
          </span>
        </div>
        <div className={`${styles.status} ${styles[agendamento.status]}`}>
          {agendamento.status === 'confirmado' && 'Confirmado'}
          {agendamento.status === 'concluido' && 'Concluído'}
          {agendamento.status === 'cancelado' && 'Cancelado'}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.detail}>
          <i className="fa-regular fa-calendar"></i>
          <span>{formatDate(agendamento.data)}</span>
        </div>
        <div className={styles.detail}>
          <i className="fa-regular fa-clock"></i>
          <span>{agendamento.hora}</span>
        </div>
        <div className={styles.detail}>
          <i className="fa-solid fa-tag"></i>
          <span>R$ {agendamento.valor.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      {!isHistorico && (
        <div className={styles.cardFooter}>
          <button 
            className={styles.rescheduleBtn}
            onClick={() => handleReschedule(agendamento.id)}
          >
            <i className="fa-regular fa-calendar-check"></i>
            Remarcar
          </button>
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
            <Link to="/agendamento" className={styles.activeLink}>Meus Agendamentos</Link>
          </nav>
          <Link to="/agendamento" className={styles.ctaButton}>
            Novo Agendamento
          </Link>
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