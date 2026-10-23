import React from 'react';
// Tailwind CSS


const ProgressBar = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Serviço' },
    { number: 2, label: 'Data & Hora' },
    { number: 3, label: 'Confirmar' },
  ];

  return (
<div className="flex items-center justify-center mb-10 gap-8 lg:gap-12">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`flex flex-col items-center relative z-10 ${currentStep >= step.number ? 'text-primary' : 'text-text-secondary'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 shadow-lg transition-all ${
              currentStep >= step.number 
                ? 'bg-primary text-white shadow-primary/40' 
                : 'bg-bg-light text-text-secondary border-2 border-border shadow-sm'
            }`}>
              {step.number}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-center px-2">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-20 h-1 mx-2 lg:mx-4 transition-all ${
              currentStep > step.number 
                ? 'bg-primary' 
                : 'bg-border'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>

  );
};

export default ProgressBar;