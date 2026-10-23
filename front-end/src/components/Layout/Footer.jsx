// src/components/Layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Tailwind CSS


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
<footer className="bg-text-main text-white pt-16 pb-0">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 mb-10 border-b border-[#404040]">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-playfair text-2xl font-bold mb-4 inline-block">
              Espaço<span className="text-primary">Beleza</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Transformando vidas através da beleza e bem-estar. 
              Um espaço dedicado para você relaxar e cuidar de si mesma.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center hover:bg-primary transition-all text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center hover:bg-primary transition-all text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#404040] rounded-full flex items-center justify-center hover:bg-primary transition-all text-white">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-playfair text-primary text-lg mb-5">Links Rápidos</h4>
            <Link to="/#servicos" className="block text-gray-300 no-underline text-sm mb-2.5 hover:text-primary transition-colors">Serviços</Link>
            <Link to="/#galeria" className="block text-gray-300 no-underline text-sm mb-2.5 hover:text-primary transition-colors">Galeria</Link>
            <Link to="/agendamento" className="block text-gray-300 no-underline text-sm mb-2.5 hover:text-primary transition-colors">Agendar</Link>
            <Link to="/#localizacao" className="block text-gray-300 no-underline text-sm hover:text-primary transition-colors">Contato</Link>
          </div>

          {/* Horário */}
          <div>
            <h4 className="font-playfair text-primary text-lg mb-5">Horário</h4>
            <p className="text-gray-300 text-sm mb-2.5 flex items-center gap-2.5"><i className="fa-solid fa-clock"></i>Seg - Sex: 9h às 20h</p>
            <p className="text-gray-300 text-sm mb-2.5 flex items-center gap-2.5"><i className="fa-solid fa-clock"></i>Sáb: 9h às 18h</p>
            <p className="text-gray-300 text-sm flex items-center gap-2.5"><i className="fa-solid fa-clock"></i>Dom: Fechado</p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-playfair text-primary text-lg mb-5">Contato</h4>
            <p className="text-gray-300 text-sm mb-2.5 flex items-center gap-2.5"><i className="fa-solid fa-map-marker-alt"></i> Av. Paulista, 1000 - SP</p>
            <p className="text-gray-300 text-sm mb-2.5 flex items-center gap-2.5"><i className="fa-solid fa-phone"></i> (11) 99999-9999</p>
            <p className="text-gray-300 text-sm flex items-center gap-2.5"><i className="fa-solid fa-envelope"></i> contato@espacobeleza.com</p>
          </div>
        </div>

        <div className="text-center py-5 border-t border-[#404040]">
          <p className="text-gray-500 text-xs">&copy; {currentYear} Espaço Beleza. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;