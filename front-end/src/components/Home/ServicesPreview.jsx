// src/components/Home/ServicesPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesPreview.module.css';

const ServicesPreview = ({ services, loading }) => {
    const getCategoryIcon = (categoria) => {
        const icons = {
            cabelo: 'fa-scissors',
            unha: 'fa-hand-sparkles',
            maquiagem: 'fa-wand-magic-sparkles',
            spa: 'fa-spa',
            outro: 'fa-star',
        };
        return icons[categoria] || 'fa-scissors';
    };

    if (loading) {
        return (
            <section className={styles.section} id="servicos">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Nossos Serviços</h2>
                        <p className={styles.subtitle}>Carregando...</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '60px' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#D4AF37' }}></i>
                    </div>
                </div>
            </section>
        );
    }

    if (!services || services.length === 0) {
        return (
            <section className={styles.section} id="servicos">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Nossos Serviços</h2>
                        <p className={styles.subtitle}>Em breve novos serviços</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section} id="servicos">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Nossos Serviços</h2>
                    <p className={styles.subtitle}>
                        Qualidade e profissionais especializados para cuidar de você
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service) => (
                        <div key={service.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                <img
                                    src={service.imagem || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                    alt={service.nome}
                                />
                                <div className={styles.cardIcon}>
                                    <i className={`fa-solid ${getCategoryIcon(service.categoria)}`}></i>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{service.nome}</h3>
                                <p className={styles.cardDescription}>
                                    {service.descricao || `Serviço de ${service.categoria}`}
                                </p>
                                <div className={styles.cardDetails}>
                                    <span className={styles.duration}>
                                        <i className="fa-regular fa-clock"></i> {service.duracao_minutos} min
                                    </span>
                                    <span className={styles.price}>
                                        R$ {parseFloat(service.preco).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                                <Link to="/agendamento" className={styles.cardBtn}>
                                    Agendar
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <Link to="/agendamento" className={styles.viewAllBtn}>
                        Ver Todos os Serviços <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesPreview;