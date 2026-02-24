// src/components/Agendamento/AgendamentoPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AgendamentoPage.module.css';
import StepService from './StepService';
import StepDateTime from './StepDateTime';
import StepConfirm from './StepConfirm';
import ProgressBar from './ProgressBar';

const AgendamentoPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: null,
    professional: null,
    date: '',
    time: '',
    observations: '',
  });
  const [showModal, setShowModal] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleConfirm = () => {
    // Aqui você faria a chamada à API
    console.log('Agendamento enviado:', formData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      {/* Header Igual ao da Home */}
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
        <ProgressBar currentStep={currentStep} />

        <div className={styles.contentWrapper}>
          {currentStep === 1 && (
            <StepService 
              selectedService={formData.service} 
              onSelect={(service) => {
                updateFormData('service', service);
                nextStep();
              }} 
            />
          )}

          {currentStep === 2 && (
            <StepDateTime 
              formData={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && (
            <StepConfirm 
              formData={formData}
              onConfirm={handleConfirm}
              onBack={prevStep}
            />
          )}
        </div>
      </main>

      {/* Footer Simples */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Espaço Beleza. Todos os direitos reservados.</p>
      </footer>

      {/* Modal de Sucesso */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.successIcon}>
              <i className="fa-solid fa-check"></i>
            </div>
            <h3>Agendamento Concluído!</h3>
            <p>Seu horário foi confirmado. Enviamos um e-mail de confirmação.</p>
            <Link to="/" className={styles.btnPrimary} onClick={closeModal}>
              Voltar para Início
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamentoPage;