// src/components/Home/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>O que Nossas Clientes Dizem</h2>
          <p className={styles.subtitle}>
            A satisfação de vocês é a nossa maior recompensa
          </p>
        </div>

        <div className={styles.slider}>
          <div 
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.slide}>
                <div className={styles.card}>
                  <div className={styles.quoteIcon}>
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <p className={styles.text}>{testimonial.text}</p>
                  <div className={styles.rating}>
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className={styles.author}>
                    <img src={testimonial.photo} alt={testimonial.name} />
                    <div>
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.service}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles */}
          <div className={styles.controls}>
            <button 
              className={styles.controlBtn}
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            <div className={styles.dots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>

            <button 
              className={styles.controlBtn}
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