// src/components/Agendamento/StepDateTime.jsx
import React, { useState, useEffect } from 'react';
import profissionalService from '../../services/profissionalService';
import agendamentoService from '../../services/agendamentoService';
import styles from './Steps.module.css';

const StepDateTime = ({ formData, onUpdate, onNext, onBack }) => {
    const [professionals, setProfessionals] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedProf, setSelectedProf] = useState(formData.professional);
    const [selectedDate, setSelectedDate] = useState(formData.date);
    const [selectedTime, setSelectedTime] = useState(formData.time);

    useEffect(() => {
        loadProfessionals();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            loadAvailability();
        }
    }, [selectedDate, selectedProf]);

    const loadProfessionals = async () => {
        try {
            const data = await profissionalService.getAll();
            setProfessionals(data);
        } catch (err) {
            console.error('Erro ao carregar profissionais:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadAvailability = async () => {
        try {
            const profId = selectedProf === 'any' ? '' : selectedProf?.id;
            const data = await agendamentoService.getDisponibilidade(profId, selectedDate);
            setAvailableTimes(data);
        } catch (err) {
            console.error('Erro ao carregar disponibilidade:', err);
        }
    };

    const handleContinue = () => {
        if (selectedProf && selectedDate && selectedTime) {
            onUpdate('professional', selectedProf);
            onUpdate('date', selectedDate);
            onUpdate('time', selectedTime);
            onNext();
        } else {
            alert('Por favor, selecione profissional, data e horário.');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#D4AF37' }}></i>
            </div>
        );
    }

    return (
        <div className={styles.stepContainer}>
            <h2>Escolha o profissional e horário</h2>

            <div className={styles.datetimeWrapper}>
                {/* Seleção de Profissional */}
                <div className={styles.section}>
                    <label className={styles.label}>Profissional</label>
                    <div className={styles.professionalList}>
                        {professionals.map((prof) => (
                            <div
                                key={prof.id}
                                className={`${styles.profOption} ${selectedProf?.id === prof.id ? styles.active : ''}`}
                                onClick={() => setSelectedProf(prof)}
                            >
                                <img src={prof.foto || 'https://via.placeholder.com/40'} alt={prof.nome} />
                                <span>{prof.nome}</span>
                            </div>
                        ))}
                        <div
                            className={`${styles.profOption} ${selectedProf === 'any' ? styles.active : ''}`}
                            onClick={() => setSelectedProf('any')}
                        >
                            <span><i className="fa-solid fa-user"></i> Qualquer um</span>
                        </div>
                    </div>
                </div>

                {/* Seleção de Data */}
                <div className={styles.section}>
                    <label className={styles.label}>Data</label>
                    <input
                        type="date"
                        className={styles.inputDate}
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                {/* Seleção de Horário */}
                {selectedDate && (
                    <div className={styles.section}>
                        <label className={styles.label}>Horários Disponíveis</label>
                        <div className={styles.timeSlots}>
                            {availableTimes.map((item) => (
                                <button
                                    key={item.hora}
                                    className={`${styles.timeBtn} ${selectedTime === item.hora ? styles.selected : ''}`}
                                    onClick={() => setSelectedTime(item.hora)}
                                    disabled={!item.disponivel}
                                    style={{ opacity: item.disponivel ? 1 : 0.5 }}
                                >
                                    {item.hora}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={onBack}>
                    Voltar
                </button>
                <button className={styles.btnPrimary} onClick={handleContinue}>
                    Próximo <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default StepDateTime;