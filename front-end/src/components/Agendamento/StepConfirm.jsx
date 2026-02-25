// src/components/Agendamento/StepConfirm.jsx
import React, { useState, useEffect } from 'react';
import styles from './Steps.module.css';

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
        <div className={styles.stepContainer}>
            <h2>Confirme seu agendamento</h2>
            <p className={styles.subtitle}>Revise os dados antes de confirmar</p>

            {!isReady ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <i className="fa-solid fa-exclamation-circle" style={{ fontSize: '40px', color: '#FFC107', marginBottom: '15px' }}></i>
                    <p style={{ color: '#757575' }}>Dados insuficientes para confirmação.</p>
                    <button
                        onClick={onBack}
                        style={{
                            marginTop: '15px',
                            padding: '10px 20px',
                            background: '#D4AF37',
                            color: '#FFF',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Voltar
                    </button>
                </div>
            ) : (
                <>
                    {/* Card de Resumo */}
                    <div className={styles.summaryCard}>
                        {/* Serviço */}
                        <div className={styles.summaryRow}>
                            <span>
                                <i className="fa-solid fa-scissors" style={{ marginRight: '8px', color: '#D4AF37' }}></i>
                                Serviço
                            </span>
                            <strong>{service?.nome}</strong>
                        </div>

                        {/* Profissional */}
                        <div className={styles.summaryRow}>
                            <span>
                                <i className="fa-solid fa-user" style={{ marginRight: '8px', color: '#D4AF37' }}></i>
                                Profissional
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img
                                    src={getProfFoto()}
                                    alt={getProfName()}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <strong>{getProfName()}</strong>
                            </div>
                        </div>

                        {/* Data */}
                        <div className={styles.summaryRow}>
                            <span>
                                <i className="fa-regular fa-calendar" style={{ marginRight: '8px', color: '#D4AF37' }}></i>
                                Data
                            </span>
                            <strong>{formatDate(date)}</strong>
                        </div>

                        {/* Horário */}
                        <div className={styles.summaryRow}>
                            <span>
                                <i className="fa-regular fa-clock" style={{ marginRight: '8px', color: '#D4AF37' }}></i>
                                Horário
                            </span>
                            <strong>{time}</strong>
                        </div>

                        {/* Duração */}
                        <div className={styles.summaryRow}>
                            <span>
                                <i className="fa-solid fa-hourglass-half" style={{ marginRight: '8px', color: '#D4AF37' }}></i>
                                Duração
                            </span>
                            <strong>{service?.duracao_minutos || '-'} minutos</strong>
                        </div>

                        {/* Total */}
                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>
                                <i className="fa-solid fa-brazilian-real-sign" style={{ marginRight: '8px' }}></i>
                                Total
                            </span>
                            <strong>{formatPrice(service?.preco)}</strong>
                        </div>
                    </div>

                    {/* Observações */}
                    <div className={styles.observations}>
                        <label htmlFor="observations">
                            <i className="fa-solid fa-comment" style={{ marginRight: '8px' }}></i>
                            Observações (opcional)
                        </label>
                        <textarea
                            id="observations"
                            placeholder="Ex: Quero um corte em camadas, pintar as pontas..."
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                            rows={4}
                        />
                    </div>

                    {/* Informações adicionais */}
                    <div style={{
                        background: '#FFF9E6',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '25px',
                        fontSize: '14px',
                        color: '#856404'
                    }}>
                        <i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }}></i>
                        Após a confirmação, você receberá um e-mail com os detalhes do agendamento.
                    </div>

                    {/* Ações */}
                    <div className={styles.actions}>
                        <button
                            className={styles.btnSecondary}
                            onClick={onBack}
                            disabled={loading}
                        >
                            <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i>
                            Voltar
                        </button>
                        <button
                            className={styles.btnPrimary}
                            onClick={handleConfirm}
                            disabled={loading}
                            style={{ opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                                    Confirmando...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-check" style={{ marginRight: '8px' }}></i>
                                    Confirmar Agendamento
                                </>
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StepConfirm;