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
                    e produtos de alta qualidade. Agende agora e descubra o
                    prazer de cuidar de si mesma.
                </p>
                <div className={styles.buttons}>
                    <Link to="/agendamento" className={styles.primaryBtn}>
                        <i className="fa-solid fa-calendar-check"></i>
                        Agendar Agora
                    </Link>
                    <a href="#servicos" className={styles.secondaryBtn}>
                        <i className="fa-solid fa-scissors"></i>
                        Ver Serviços
                    </a>
                </div>

                {/* Stats Rápidas */}
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>10+</span>
                        <span className={styles.statLabel}>Anos de experiência</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>5k+</span>
                        <span className={styles.statLabel}>Clientes satisfeitas</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>4.9</span>
                        <span className={styles.statLabel}>Nota média</span>
                    </div>
                </div>
            </div>
            <div className={styles.scrollDown}>
                <i className="fa-solid fa-chevron-down"></i>
            </div>
        </section>
    );
};

export default Hero;