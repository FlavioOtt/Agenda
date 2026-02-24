// src/components/Agendamento/StepDateTime.jsx
import React, { useState, useEffect } from 'react';
import styles from './Steps.module.css';

const professionals = [
  { id: 1, name: 'Carla', img: 'https://i.pravatar.cc/150?img=5' },
  { id: 2, name: 'João', img: 'https://i.pravatar.cc/150?img=8' },
];

const StepDateTime = ({ formData, onUpdate, onNext, onBack }) => {
  const [selectedProf, setSelectedProf] = useState(formData.professional);
  const [selectedDate, setSelectedDate] = useState(formData.date);
  const [selectedTime, setSelectedTime] = useState(formData.time);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Simulação de horários disponíveis
  useEffect(() => {
    if (selectedDate) {
      // Aqui você faria uma chamada à API: GET /disponibilidade?data=...
      setAvailableTimes(['09:00', '10:00', '11:30', '14:00', '15:30', '16:00']);
    }
  }, [selectedDate]);

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

  // Data mínima = hoje
  const today = new Date().toISOString().split('T')[0];

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
                <img src={prof.img} alt={prof.name} />
                <span>{prof.name}</span>
              </div>
            ))}
            <div 
              className={`${styles.profOption} ${selectedProf === 'any' ? styles.active : ''}`}
              onClick={() => setSelectedProf('any')}
            >
              <span className={styles.anyProf}><i className="fa-solid fa-user"></i> Qualquer um</span>
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
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
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