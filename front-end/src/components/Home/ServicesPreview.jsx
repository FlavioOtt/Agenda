// src/components/Home/ServicesPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Tailwind CSS


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
<section id="servicos" className="py-20 bg-bg-light">
            <div className="max-w-6xl mx-auto px-5">
                <div className="text-center mb-12">
                    <h2 className="font-playfair text-[40px] text-text-main mb-4">Nossos Serviços</h2>
                    <p className="text-text-secondary text-lg">
                        Qualidade e profissionais especializados para cuidar de você
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-card hover:-translate-y-3 shadow-hover transition-all duration-300 group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={service.imagem || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                    alt={service.nome}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute -bottom-6 right-5 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                                    <i className={`fa-solid ${getCategoryIcon(service.categoria)}`}></i>
                                </div>
                            </div>
                            <div className="p-6 pt-12">
                                <h3 className="text-xl font-bold text-text-main mb-3">{service.nome}</h3>
                                <p className="text-text-secondary mb-4 line-clamp-2">
                                    {service.descricao || `Serviço de ${service.categoria}`}
                                </p>
                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-text-secondary text-sm flex items-center gap-1">
                                        <i className="fa-regular fa-clock text-primary"></i> 
                                        {service.duracao_minutos} min
                                    </span>
                                    <span className="text-primary font-bold text-xl">
                                        R$ {parseFloat(service.preco).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                                <Link to="/agendamento" className="block w-full text-center py-3 bg-primary text-white rounded-md font-bold hover:bg-primary-hover transition-all">
                                    Agendar
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/agendamento" className="inline-flex items-center gap-3 text-primary no-underline font-bold text-xl hover:gap-4 transition-all">
                        Ver Todos os Serviços <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>

    );
};

export default ServicesPreview;