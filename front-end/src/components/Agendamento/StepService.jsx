// src/components/Agendamento/StepService.jsx
import React, { useState, useEffect } from 'react';
import servicoService from '../../services/servicoService';
// Tailwind CSS


const StepService = ({ selectedService, onSelect }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            setLoading(true);
            const data = await servicoService.getAll();
            setServices(data);
        } catch (err) {
            setError('Erro ao carregar serviços');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.stepContainer}>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#D4AF37' }}></i>
                    <p style={{ marginTop: '10px' }}>Carregando serviços...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.stepContainer}>
                <div style={{ textAlign: 'center', padding: '40px', color: '#E74C3C' }}>
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    <p>{error}</p>
                    <button onClick={loadServices} style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
<div className="animate-fade-in">
            <h2 className="font-playfair text-[28px] text-center mb-3 text-text-main">Qual serviço você deseja?</h2>
            <p className="text-center text-text-secondary text-lg mb-10 max-w-lg mx-auto">
                Selecione um serviço para continuar
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className={`group bg-white p-6 rounded-3xl border-2 cursor-pointer flex items-center relative overflow-hidden hover:shadow-2xl hover:shadow-primary/25 hover:border-primary hover:-translate-y-2 transition-all duration-500 shadow-lg ${
                            selectedService?.id === service.id 
                              ? 'border-primary bg-gradient-to-br from-primary/5 shadow-primary/20 ring-4 ring-primary/20' 
                              : 'border-border hover:border-primary'
                        }`}
                        onClick={() => onSelect(service)}
                    >
                        {/* Check icon */}
                        {selectedService?.id === service.id && (
                          <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl shadow-2xl">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        )}
                        
                        <div className="w-14 h-14 bg-bg-light rounded-full flex items-center justify-center flex-shrink-0 mr-5 group-hover:bg-primary group-hover:text-white transition-all">
                            <i className="fa-solid fa-scissors text-xl"></i>
                        </div>
                        
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-text-main mb-1 group-hover:text-primary transition-colors">{service.nome}</h3>
                            <p className="text-text-secondary text-sm flex items-center gap-2 mb-0">
                                <i className="fa-regular fa-clock text-primary"></i>
                                {service.duracao_minutos} min
                            </p>
                        </div>
                        
                        <div className="text-2xl font-bold text-primary ml-4 flex-shrink-0">
                            R$ {service.preco.toFixed(2).replace('.', ',')}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default StepService;