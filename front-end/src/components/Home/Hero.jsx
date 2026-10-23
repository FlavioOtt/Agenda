// src/components/Home/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Tailwind CSS


const Hero = () => {
    return (
<section id="hero" className="h-screen min-h-[700px] bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative flex items-center justify-center text-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"></div>
            
            <div className="relative z-10 max-w-[800px] px-5">
                <h1 className="font-playfair text-[56px] md:text-[3.5rem] font-black text-white mb-5 leading-tight">
                    Beleza e Bem-estar em um só lugar
                </h1>
                <p className="text-[18px] md:text-xl text-gray-200 mb-10 leading-relaxed">
                    Transformamos seu visual com profissionais especializados
                    e produtos de alta qualidade. Agende agora e descubra o
                    prazer de cuidar de si mesma.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
                    <Link to="/agendamento" className="bg-primary text-white px-9 py-4 rounded-md font-bold text-lg hover:bg-primary-hover transform hover:-translate-y-1 shadow-2xl hover:shadow-primary/40 transition-all duration-300 flex items-center gap-3">
                        <i className="fa-solid fa-calendar-check"></i>
                        Agendar Agora
                    </Link>
                    <a href="#servicos" className="bg-transparent text-white border-2 border-white px-9 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-text-main transition-all duration-300 flex items-center gap-3">
                        <i className="fa-solid fa-scissors"></i>
                        Ver Serviços
                    </a>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-15 md:gap-15 xl:gap-15">
                    <div className="flex flex-col items-center">
                        <span className="font-playfair text-[42px] md:text-[3rem] font-black text-primary">10+</span>
                        <span className="text-sm text-gray-400 uppercase tracking-wider font-bold mt-1">Anos de experiência</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-playfair text-[42px] md:text-[3rem] font-black text-primary">5k+</span>
                        <span className="text-sm text-gray-400 uppercase tracking-wider font-bold mt-1">Clientes satisfeitas</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-playfair text-[42px] md:text-[3rem] font-black text-primary">4.9</span>
                        <span className="text-sm text-gray-400 uppercase tracking-wider font-bold mt-1">Nota média</span>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-2xl animate-bounce">
                <i className="fa-solid fa-chevron-down"></i>
            </div>
        </section>

    );
};

export default Hero;