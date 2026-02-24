// src/components/Agendamento/StepConfirm.jsx
import React, { useState } from 'react';
import styles from './Steps.module.css';

const StepConfirm = ({ formData, onConfirm, onBack }) => {
    const { service, professional, date, time } = formData;

    const [ observations, setObservations ] = useState()

    // Formatar data
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    const formatPrice = (price) => {
        return price ? `R$ ${price.toFixed(2).replace('.', ',')}` : '-';
    };

    const getProfName = () => {
        if (professional === 'any') return 'Profissional disponível';
        return professional?.name;
    };

    const handleConfirm = () => {
        
    }

    return (
        <div className={styles.stepContainer}>
            <h2>Confirme seu agendamento</h2>

            <div className={styles.summaryCard}>
                <div className={styles.summaryRow}>
                    <span>Serviço</span>
                    <strong>{service?.name}</strong>
                </div>
                <div className={styles.summaryRow}>
                    <span>Profissional</span>
                    <strong>{getProfName()}</strong>
                </div>
                <div className={styles.summaryRow}>
                    <span>Data</span>
                    <strong>{date ? formatDate(date) : '-'}</strong>
                </div>
                <div className={styles.summaryRow}>
                    <span>Horário</span>
                    <strong>{time || '-'}</strong>
                    Copy code
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryRow}>
                            <span>Serviço</span>
                            <strong>{service?.name}</strong>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Profissional</span>
                            <strong>{getProfName()}</strong>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Data</span>
                            <strong>{formatDate(date)}</strong>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Horário</span>
                            <strong>{time || '-'}</strong>
                        </div>

                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>Total</span>
                            <strong>{formatPrice(service?.price)}</strong>
                        </div>
                    </div>

                    <div className={styles.observations}>
                        <label htmlFor="observations">Observações (opcional)</label>
                        <textarea
                            id="observations"
                            placeholder="Ex: Quero um corte em camadas, pintar as pontas..."
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.btnSecondary} onClick={onBack}>
                            Voltar
                        </button>
                        <button className={styles.btnPrimary} onClick={handleConfirm}>
                            Confirmar Agendamento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default StepConfirm;