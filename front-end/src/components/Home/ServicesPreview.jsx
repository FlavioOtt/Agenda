// src/components/Home/ServicesPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesPreview.module.css';

const services = [
  {
    id: 1,
    name: 'Corte Feminino',
    price: 80,
    duration: 45,
    icon: 'fa-scissors',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Coloração',
    price: 150,
    duration: 120,
    icon: 'fa-palette',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Manicure e Pedicure',
    price: 70,
    duration: 60,
    icon: 'fa-hand-sparkles',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Maquiagem Profissional',
    price: 120,
    duration: 60,
    icon: 'fa-wand-magic-sparkles',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
];

const ServicesPreview = () => {
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
                <img src={service.image} alt={service.name} />
                <div className={styles.cardIcon}>
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.name}</h3>
                <div className={styles.cardDetails}>
                  <span className={styles.duration}>
                    <i className="fa-regular fa-clock"></i> {service.duration} min
                  </span>
                  <span className={styles.price}>
                    R$ {service.price},00
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