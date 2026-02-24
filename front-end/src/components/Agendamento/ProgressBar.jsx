import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Serviço' },
    { number: 2, label: 'Data & Hora' },
    { number: 3, label: 'Confirmar' },
  ];

  return (
    <div className={styles.progressBar}>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`${styles.step} ${currentStep >= step.number ? styles.active : ''}`}>
            <div className={styles.stepNumber}>{step.number}</div>
            <span className={styles.stepLabel}>{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`${styles.line} ${currentStep > step.number ? styles.active : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;