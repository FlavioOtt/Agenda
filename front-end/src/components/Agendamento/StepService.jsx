// src/components/Agendamento/StepService.jsx
import React from 'react';
import styles from './Steps.module.css';

const servicesData = [
  {
    id: 1,
    name: 'Corte Feminino',
    duration: 45,
    price: 80.00,
    icon: 'fa-scissors',
  },
  {
    id: 2,
    name: 'Escova Progressiva',
    duration: 120,
    price: 250.00,
    icon: 'fa-wand-magic-sparkles',
  },
  {
    id: 3,
    name: 'SPA das Mãos',
    duration: 60,
    price: 120.00,
    icon: 'fa-hand-sparkles',
  },
];

const StepService = ({ selectedService, onSelect }) => {
  return (
    <div className={styles.stepContainer}>
      <h2>Qual serviço você deseja?</h2>
      <p className={styles.subtitle}>Selecione um serviço para continuar</p>

      <div className={styles.servicesGrid}>
        {servicesData.map((service) => (
          <div 
            key={service.id}
            className={`${styles.serviceCard} ${selectedService?.id === service.id ? styles.selected : ''}`}
            onClick={() => onSelect(service)}
          >
            <div className={styles.serviceIcon}>
              <i className={`fa-solid ${service.icon}`}></i>
            </div>
            <div className={styles.serviceInfo}>
              <h3>{service.name}</h3>
              <p className={styles.duration}>
                <i className="fa-regular fa-clock"></i> {service.duration} min
              </p>
            </div>
            <div className={styles.servicePrice}>
              R$ {service.price.toFixed(2).replace('.', ',')}
            </div>
            <div className={styles.checkIcon}>
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepService;