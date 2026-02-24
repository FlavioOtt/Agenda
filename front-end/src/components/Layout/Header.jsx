// src/components/Layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Espaço<span>Beleza</span>
        </Link>

        {/* Menu Desktop */}
        <nav className={styles.nav}>
          <Link to="/#hero">Início</Link>
          <Link to="/#servicos">Serviços</Link>
          <Link to="/#galeria">Galeria</Link>
          <Link to="/#sobre">Sobre</Link>
          <Link to="/#localizacao">Contato</Link>
          <Link to="/meus-agendamentos">Meus Agendamentos</Link>
        </nav>

        {/* Botão Agendar */}
        <Link to="/agendamento" className={styles.ctaButton}>
          Agendar Agora
        </Link>

        {/* Menu Mobile */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Menu Mobile Aberto */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/#hero" onClick={() => setIsMenuOpen(false)}>Início</Link>
          <Link to="/#servicos" onClick={() => setIsMenuOpen(false)}>Serviços</Link>
          <Link to="/#galeria" onClick={() => setIsMenuOpen(false)}>Galeria</Link>
          <Link to="/#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
          <Link to="/#localizacao" onClick={() => setIsMenuOpen(false)}>Contato</Link>
          <Link to="/agendamento" className={styles.mobileCta}>Agendar Agora</Link>
          <Link to="/meus-agendamentos">Meus Agendamentos</Link>
        </div>
      )}
    </header>
  );
};

export default Header;