// src/components/Agendamento/AgendamentoPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import agendamentoService from '../../services/agendamentoService';
import authService from '../../services/authService';
import styles from './AgendamentoPage.module.css';
import StepService from './StepService';
import StepDateTime from './StepDateTime';
import StepConfirm from './StepConfirm';
import ProgressBar from './ProgressBar';

const AgendamentoPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
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

    const handleConfirm = async () => {
        // Verificar se está logado
        if (!authService.isAuthenticated()) {
            alert('Por favor, faça login para continuar');
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            // Converter data e hora para formato ISO
            const dataHora = `${formData.date}T${formData.time}:00`;

            const payload = {
                servico_id: formData.service.id,
                profissional_id: formData.professional === 'any' ? null : formData.professional.id,
                data_hora: dataHora,
                observacoes: formData.observations,
            };

            await agendamentoService.create(payload);
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            alert('Erro ao criar agendamento. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/meus-agendamentos');
    };

    // Verificar se é admin
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
                        <Link to="/meus-agendamentos">Meus Agendamentos</Link>
                        {isAdmin && <Link to="/admin/dashboard">Painel Admin</Link>}
                    </nav>
                    {authService.isAuthenticated() ? (
                        <button
                            onClick={() => { authService.logout(); navigate('/'); }}
                            className={styles.ctaButton}
                        >
                            Sair
                        </button>
                    ) : (
                        <Link to="/login" className={styles.ctaButton}>
                            Login
                        </Link>
                    )}
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
                            loading={loading}
                        />
                    )}
                </div>
            </main>

            {/* Footer */}
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
                        <p>Seu horário foi confirmado com sucesso.</p>
                        <Link to="/meus-agendamentos" className={styles.btnPrimary} onClick={closeModal}>
                            Ver Meus Agendamentos
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgendamentoPage;