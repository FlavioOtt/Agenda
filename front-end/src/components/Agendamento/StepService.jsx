// src/components/Agendamento/StepService.jsx
import React, { useState, useEffect } from 'react';
import servicoService from '../../services/servicoService';
import styles from './Steps.module.css';

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
        <div className={styles.stepContainer}>
            <h2>Qual serviço você deseja?</h2>
            <p className={styles.subtitle}>Selecione um serviço para continuar</p>

            <div className={styles.servicesGrid}>
                {services.map((service) => (
                    <div
                        key={service.id}
                        className={`${styles.serviceCard} ${selectedService?.id === service.id ? styles.selected : ''}`}
                        onClick={() => onSelect(service)}
                    >
                        <div className={styles.serviceIcon}>
                            <i className="fa-solid fa-scissors"></i>
                        </div>
                        <div className={styles.serviceInfo}>
                            <h3>{service.nome}</h3>
                            <p className={styles.duration}>
                                <i className="fa-regular fa-clock"></i> {service.duracao_minutos} min
                            </p>
                        </div>
                        <div className={styles.servicePrice}>
                            R$ {service.preco.toFixed(2).replace('.', ',')}
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