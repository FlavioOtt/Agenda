// src/components/Layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Tailwind CSS


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
<header className="bg-white shadow-sm sticky top-0 z-[1000]">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="font-playfair text-xl font-bold text-text-main">
          Espaço<span className="text-primary">Beleza</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-8">
          <Link to="/#hero" className="no-underline text-text-main font-bold text-sm relative hover:text-primary after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Início</Link>
          <Link to="/#servicos" className="no-underline text-text-main font-bold text-sm relative hover:text-primary after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Serviços</Link>
          <Link to="/#galeria" className="no-underline text-text-main font-bold text-sm relative hover:text-primary after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Galeria</Link>
          <Link to="/#sobre" className="no-underline text-text-main font-bold text-sm relative hover:text-primary after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Sobre</Link>
          <Link to="/#localizacao" className="no-underline text-text-main font-bold text-sm relative hover:text-primary after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Contato</Link>
          <Link to="/meus-agendamentos" className="no-underline text-text-main font-bold text-sm relative hover:text-primary after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">Meus Agendamentos</Link>
        </nav>

        {/* Botão Agendar */}
        <Link 
          to="/agendamento" 
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-hover transition-all font-bold text-sm"
        >
          Agendar Agora
        </Link>

        {/* Menu Mobile Toggle */}
        <button 
          className="md:hidden text-2xl text-text-main" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col p-5 bg-white border-t border-border">
          <Link to="/#hero" onClick={() => setIsMenuOpen(false)} className="py-3 font-bold text-text-main border-b border-bg-light hover:text-primary">Início</Link>
          <Link to="/#servicos" onClick={() => setIsMenuOpen(false)} className="py-3 font-bold text-text-main border-b border-bg-light hover:text-primary">Serviços</Link>
          <Link to="/#galeria" onClick={() => setIsMenuOpen(false)} className="py-3 font-bold text-text-main border-b border-bg-light hover:text-primary">Galeria</Link>
          <Link to="/#sobre" onClick={() => setIsMenuOpen(false)} className="py-3 font-bold text-text-main border-b border-bg-light hover:text-primary">Sobre</Link>
          <Link to="/#localizacao" onClick={() => setIsMenuOpen(false)} className="py-3 font-bold text-text-main border-b border-bg-light hover:text-primary">Contato</Link>
          <Link to="/agendamento" className="py-3 bg-primary text-white text-center rounded font-bold mt-2 hover:bg-primary-hover" onClick={() => setIsMenuOpen(false)}>Agendar Agora</Link>
          <Link to="/meus-agendamentos" className="py-3 font-bold text-text-main border-b border-bg-light hover:text-primary" onClick={() => setIsMenuOpen(false)}>Meus Agendamentos</Link>
        </div>
      )}
    </header>

  );
};

export default Header;