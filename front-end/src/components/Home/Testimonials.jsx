// src/components/Home/Testimonials.jsx
import React, { useState, useEffect } from 'react';
// Tailwind CSS


const testimonials = [
  {
    id: 1,
    name: 'Mariana Silva',
    photo: 'https://i.pravatar.cc/150?img=1',
    service: 'Corte + Coloração',
    rating: 5,
    text: 'Ambiente maravilhoso! A Carla é uma profissional incrível, sempre entende exatamente o que quero. Meus cabelos nunca ficaram tão saudáveis!',
  },
  {
    id: 2,
    name: 'Fernanda Oliveira',
    photo: 'https://i.pravatar.cc/150?img=5',
    service: 'Maquiagem Profissional',
    rating: 5,
    text: 'Fui para o meu casamento e a maquiagem ficou perfeita! Durou o dia todo e eu me senti linda. Super recomendo!',
  },
  {
    id: 3,
    name: 'Carla Santos',
    photo: 'https://i.pravatar.cc/150?img=9',
    service: 'SPA das Mãos',
    rating: 5,
    text: 'O melhor spa de mãos da cidade! Cheguei estressada do trabalho e sai completamente relaxada. Voltarei com certeza!',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play dos depoimentos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className="fa-solid fa-star"
        style={{ color: i < rating ? '#D4AF37' : '#E0E0E0' }}
      ></i>
    ));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
<section className="py-20 bg-gradient-to-br from-text-main to-gray-800">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="font-playfair text-[40px] text-white mb-4">O que Nossas Clientes Dizem</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A satisfação de vocês é a nossa maior recompensa
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="min-w-full px-2.5">
                <div className="bg-white rounded-3xl p-10 shadow-2xl text-center mx-auto max-w-2xl">
                  <div className="text-primary text-3xl mb-5">
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <p className="text-xl leading-relaxed italic text-text-main mb-6 font-medium">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-center mb-6 gap-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-primary ring-offset-transparent"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-text-main">{testimonial.name}</h4>
                      <span className="text-text-secondary text-sm">{testimonial.service}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-5 mt-12">
            <button 
              className="w-12 h-12 rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-primary hover:border-primary transition-all flex items-center justify-center"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            <div className="flex gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-[10px] h-[10px] rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-primary rounded-lg' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            <button 
              className="w-12 h-12 rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-primary hover:border-primary transition-all flex items-center justify-center"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Testimonials;