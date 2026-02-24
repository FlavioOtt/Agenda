// src/components/Home/About.jsx
import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.section} id="sobre">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1521590832169-7dad6c8cc8c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Espaço Beleza - Interior do salão" 
              className={styles.mainImage}
            />
            <div className={styles.experienceBadge}>
              <span className={styles.number}>10+</span>
              <span className={styles.text}>Anos de<br/>Experiência</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <h4 className={styles.label}>Sobre Nós</h4>
            <h2 className={styles.title}>Um Espaço Dedicado à Sua Beleza</h2>
            <p className={styles.description}>
              O Espaço Beleza nasceu com a missão de transformar a experiência de 
              cuidar de si mesma. Localizado no coração da cidade, oferecemos um 
              ambiente acolhedor e sofisticado, onde cada detalhe foi pensado para 
              proporcionar momentos de relaxamento e renovação.
            </p>
            <p className={styles.description}>
              Nossa equipe é formada por profissionais altamente qualificados e 
              apaixonados pelo que fazem. Utilizamos apenas produtos de marcas 
              reconhecidas internacionalmente, garantindo resultados excepcionais 
              e a segurança que você merece.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4>Profissionais Qualificados</h4>
                  <p>Equipe certificada e em constante atualização</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4>Produtos Premium</h4>
                  <p>Marcas reconhecidas internacionalmente</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4>Ambiente Acolhedor</h4>
                  <p>Conforto e relaxamento em cada detalhe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;