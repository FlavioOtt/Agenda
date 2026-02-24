// src/components/Home/Location.jsx
import React from 'react';
import styles from './Location.module.css';

const Location = () => {
  return (
    <section className={styles.section} id="localizacao">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Venha Nos Visitar</h2>
          <p className={styles.subtitle}>
            Estamos localizados em um local de fácil acesso
          </p>
        </div>

        <div className={styles.grid}>
          {/* Informações de Contato */}
          <div className={styles.info}>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Informações de Contato</h3>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fa-solid fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>Endereço</h4>
                  <p>Av. Paulista, 1000 - Bela Vista<br/>São Paulo - SP, 01310-100</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4>Telefone</h4>
                  <p>(11) 99999-9999</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4>E-mail</h4>
                  <p>contato@espacobeleza.com</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h4>Horário de Funcionamento</h4>
                  <p>Seg - Sex: 9h às 20h<br/>Sáb: 9h às 18h<br/>Dom: Fechado</p>
                </div>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialBtn}>
                <i className="fa-brands fa-instagram"></i>
                <span>@espacobeleza</span>
              </a>
              <a href="#" className={styles.socialBtn}>
                <i className="fa-brands fa-facebook"></i>
                <span>/espacobeleza</span>
              </a>
              <a href="#" className={styles.socialBtn}>
                <i className="fa-brands fa-whatsapp"></i>
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mapa */}
          <div className={styles.mapWrapper}>
            <div className={styles.map}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.098169135152!2d-46.65412682497169!3d-23.56136147879769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa281%3A0x5d6f5751282b82d9!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Espaço Beleza"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Formulário de Contato Rápido */}
        <div className={styles.formSection}>
          <h3 className={styles.formTitle}>Fale Conosco</h3>
          <p className={styles.formSubtitle}>Tire suas dúvidas ou solicite um orçamento</p>
          
          <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" placeholder="Seu nome completo" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="seu@email.com" />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefone</label>
                <input type="tel" id="phone" placeholder="(11) 99999-9999" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Assunto</label>
                <select id="subject">
                  <option value="">Selecione um assunto</option>
                  <option value="agendamento">Agendamento</option>
                  <option value="orcamento">Orçamento</option>
                  <option value="duvida">Dúvida</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Mensagem</label>
              <textarea id="message" rows="5" placeholder="Sua mensagem..."></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Enviar Mensagem <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Location;