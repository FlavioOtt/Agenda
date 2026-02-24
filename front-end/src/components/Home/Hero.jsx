// src/components/Home/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Beleza e Bem-estar em um só lugar</h1>
        <p className={styles.subtitle}>
          Transformamos seu visual com profissionais especializados 
          e produtos de alta qualidade.
        </p>
        <div className={styles.buttons}>
          <Link to="/agendamento" className={styles.primaryBtn}>
            Agendar Agora
          </Link>
          <a href="#servicos" className={styles.secondaryBtn}>
            Ver Serviços
          </a>
        </div>
      </div>
      <div className={styles.scrollDown}>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Hero;