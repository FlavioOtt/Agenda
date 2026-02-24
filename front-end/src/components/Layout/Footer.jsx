// src/components/Layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo e Descrição */}
          <div className={styles.col}>
            <Link to="/" className={styles.logo}>
              Espaço<span>Beleza</span>
            </Link>
            <p className={styles.description}>
              Transformando vidas através da beleza e bem-estar. 
              Um espaço dedicado para você relaxar e cuidar de si mesma.
            </p>
            <div className={styles.social}>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className={styles.col}>
            <h4>Links Rápidos</h4>
            <Link to="/#servicos">Serviços</Link>
            <Link to="/#galeria">Galeria</Link>
            <Link to="/agendamento">Agendar</Link>
            <Link to="/#localizacao">Contato</Link>
          </div>

          {/* Horário de Funcionamento */}
          <div className={styles.col}>
            <h4>Horário</h4>
            <p>Segunda - Sexta: 9h às 20h</p>
            <p>Sábado: 9h às 18h</p>
            <p>Domingo: Fechado</p>
          </div>

          {/* Contato */}
          <div className={styles.col}>
            <h4>Contato</h4>
            <p><i className="fa-solid fa-map-marker-alt"></i> Av. Paulista, 1000 - SP</p>
            <p><i className="fa-solid fa-phone"></i> (11) 99999-9999</p>
            <p><i className="fa-solid fa-envelope"></i> contato@espacobeleza.com</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Espaço Beleza. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;