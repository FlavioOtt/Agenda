// src/components/Agendamento/AgendamentoPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import agendamentoService from '../../services/agendamentoService';
import authService from '../../services/authService';
// Tailwind CSS

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
<div className="min-h-screen flex flex-col bg-bg-light">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="font-playfair text-2xl font-bold text-text-main">
                        Espaço<span className="text-primary">Beleza</span>
                    </Link>
                    <nav className="hidden md:flex gap-8">
                        <Link to="/" className="font-bold text-text-main hover:text-primary transition-colors">Início</Link>
                        <Link to="/meus-agendamentos" className="font-bold text-text-main hover:text-primary transition-colors">Meus Agendamentos</Link>
                        {isAdmin && <Link to="/admin/dashboard" className="font-bold text-text-main hover:text-primary transition-colors">Painel Admin</Link>}
                    </nav>
                    {authService.isAuthenticated() ? (
                        <button
                            onClick={() => { authService.logout(); navigate('/'); }}
                            className="bg-primary text-white px-6 py-2 rounded-md font-bold hover:bg-primary-hover transition-all"
                        >
                            Sair
                        </button>
                    ) : (
                        <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-md font-bold hover:bg-primary-hover transition-all">
                            Login
                        </Link>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-4xl mx-auto w-full px-6 pb-10 pt-20">
                <ProgressBar currentStep={currentStep} />

                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 min-h-[500px]">
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
            <footer className="bg-text-main text-white/70 py-5 text-center text-sm border-t border-text-main/20">
                <p>&copy; {new Date().getFullYear()} Espaço Beleza. Todos os direitos reservados.</p>
            </footer>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-8 animate-fade-in" onClick={closeModal}>
                    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-check text-3xl text-green-500"></i>
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-text-main mb-3">Agendamento Concluído!</h3>
                        <p className="text-text-secondary mb-8">Seu horário foi confirmado com sucesso.</p>
                        <Link 
                            to="/meus-agendamentos" 
                            className="block w-full bg-primary text-white py-4 px-6 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-xl" 
                            onClick={closeModal}
                        >
                            Ver Meus Agendamentos
                        </Link>
                    </div>
                </div>
            )}
        </div>

    );
};

export default AgendamentoPage;