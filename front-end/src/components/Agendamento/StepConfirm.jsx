// src/components/Agendamento/StepConfirm.jsx
import React, { useState, useEffect } from 'react';
// Tailwind CSS


const StepConfirm = ({ formData, onConfirm, onBack, loading }) => {
    const { service, professional, date, time } = formData;
    const [observations, setObservations] = useState('');

    // Formatar data
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    const formatPrice = (price) => {
        if (!price) return '-';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return `R$ ${numPrice.toFixed(2).replace('.', ',')}`;
    };

    const getProfName = () => {
        if (!professional) return '-';
        if (professional === 'any') return 'Profissional disponível';
        return professional.nome || '-';
    };

    const getProfFoto = () => {
        if (!professional || professional === 'any') {
            return 'https://ui-avatars.com/api/?name=Prof&background=D4AF37&color=fff';
        }
        return professional.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.nome)}&background=D4AF37&color=fff`;
    };

    const handleConfirm = () => {
        const dataConfirm = {
            ...formData,
            observations
        };
        onConfirm(dataConfirm);
    };

    // Verificar se tem dados suficientes
    const isReady = service && date && time;

    return (
<div className="animate-fade-in">
            <h2 className="font-playfair text-[28px] text-center mb-3 text-text-main">Confirme seu agendamento</h2>
            <p className="text-center text-text-secondary text-lg mb-10 max-w-lg mx-auto">
                Revise os dados antes de confirmar
            </p>

            {!isReady ? (
                <div className="text-center p-12 bg-bg-light rounded-3xl shadow-lg">
                    <i className="fa-solid fa-exclamation-circle text-5xl text-warning mb-6 block"></i>
                    <p className="text-xl font-medium text-text-secondary mb-8">Dados insuficientes para confirmação</p>
                    <button
                        onClick={onBack}
                        className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-hover shadow-xl hover:shadow-primary/40 transition-all"
                    >
                        Voltar ao formulário
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Summary Card */}
                    <div className="bg-gradient-to-br from-bg-light to-white rounded-3xl p-8 shadow-2xl border border-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                {/* Serviço */}
                                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <i className="fa-solid fa-scissors text-xl text-primary"></i>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-text-secondary text-sm font-medium block mb-1">Serviço</span>
                                        <h3 className="font-bold text-lg text-text-main">{service?.nome}</h3>
                                    </div>
                                </div>

                                {/* Data */}
                                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <i className="fa-regular fa-calendar text-xl text-primary"></i>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-text-secondary text-sm font-medium block mb-1">Data</span>
                                        <span className="font-bold text-lg text-text-main">{formatDate(date)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Profissional */}
                                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <i className="fa-solid fa-user text-xl text-primary"></i>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-text-secondary text-sm font-medium block mb-1">Profissional</span>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={getProfFoto()}
                                                alt={getProfName()}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50 shadow-md"
                                            />
                                            <span className="font-bold text-lg text-text-main">{getProfName()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Horário e Duração */}
                                <div className="grid grid-cols-2 gap-4 p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
                                    <div>
                                        <span className="text-text-secondary text-sm font-medium block mb-1">Horário</span>
                                        <span className="font-bold text-lg text-text-main">{time}</span>
                                    </div>
                                    <div>
                                        <span className="text-text-secondary text-sm font-medium block mb-1">Duração</span>
                                        <span className="font-bold text-lg text-text-main">{service?.duracao_minutos || '-'} min</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="pt-6 border-t border-primary/20">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-3 text-xl">
                                    <i className="fa-solid fa-brazilian-real-sign text-primary"></i>
                                    Total
                                </span>
                                <span className="text-3xl font-bold text-primary tracking-tight">
                                    {formatPrice(service?.preco)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <label htmlFor="observations" className="flex items-center gap-3 font-bold text-text-main mb-4 text-lg">
                            <i className="fa-solid fa-comment-dots text-primary"></i>
                            Observações (opcional)
                        </label>
                        <textarea
                            id="observations"
                            placeholder="Alguma observação especial? (ex: 'Quero corte em camadas, pintar pontas claras, manter comprimento...')"
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                            rows={4}
                            className="w-full p-6 border-2 border-border rounded-2xl resize-vertical focus:ring-4 focus:ring-primary/30 focus:border-primary transition-all bg-white shadow-inner hover:shadow-lg font-medium placeholder:text-text-secondary"
                        />
                    </div>

                    {/* Info Box */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-3xl border border-yellow-200 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fa-solid fa-info-circle text-xl text-yellow-600"></i>
                            </div>
                            <p className="text-yellow-900 font-medium leading-relaxed">
                                Após a confirmação, você receberá um e-mail com os detalhes do agendamento e lembrete 24h antes.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 justify-end pt-6">
                        <button
                            className="px-10 py-4 border-2 border-border text-text-secondary font-bold rounded-2xl hover:border-primary hover:text-primary hover:bg-primary/5 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                            onClick={onBack}
                            disabled={loading}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Alterar Dados
                        </button>
                        <button
                            className="px-12 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-2xl shadow-2xl hover:shadow-primary/50 hover:scale-[1.02] hover:shadow-3xl transition-all duration-300 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
                            onClick={handleConfirm}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                    Confirmando...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-check-double"></i>
                                    Confirmar Agendamento
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default StepConfirm;