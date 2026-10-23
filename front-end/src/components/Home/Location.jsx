// src/components/Home/Location.jsx
import React from 'react';
// Tailwind CSS


const Location = () => {
  return (
<section id="localizacao" className="py-20 bg-bg-light">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="font-playfair text-[40px] text-text-main mb-4">Venha Nos Visitar</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Estamos localizados em um local de fácil acesso
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 mb-16">
          {/* Contact Info */}
          <div>
            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
              <h3 className="font-playfair text-2xl text-text-main mb-6 pb-4 border-b border-border">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fa-solid fa-map-marker-alt text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main mb-2">Endereço</h4>
                    <p className="text-text-secondary leading-relaxed">Av. Paulista, 1000 - Bela Vista<br/>São Paulo - SP, 01310-100</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fa-solid fa-phone text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main mb-2">Telefone</h4>
                    <p className="text-text-secondary font-mono text-lg font-bold">(11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fa-solid fa-envelope text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main mb-2">E-mail</h4>
                    <p className="text-text-secondary font-mono">contato@espacobeleza.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fa-solid fa-clock text-primary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main mb-2">Horário de Funcionamento</h4>
                    <p className="text-text-secondary">
                      Seg - Sex: <span className="font-bold">9h às 20h</span><br/>
                      Sáb: <span className="font-bold">9h às 18h</span><br/>
                      Dom: <span className="font-bold text-red-500">Fechado</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:translate-x-2 transition-all shadow-md hover:shadow-xl group">
                <i className="fa-brands fa-instagram text-2xl group-hover:text-pink-500 transition-colors"></i>
                <span className="font-bold text-text-main">@espacobeleza</span>
              </a>
              <a href="#" className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:translate-x-2 transition-all shadow-md hover:shadow-xl group">
                <i className="fa-brands fa-facebook text-2xl group-hover:text-blue-600 transition-colors"></i>
                <span className="font-bold text-text-main">/espacobeleza</span>
              </a>
              <a href="#" className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:translate-x-2 transition-all shadow-md hover:shadow-xl group">
                <i className="fa-brands fa-whatsapp text-2xl group-hover:text-green-500 transition-colors"></i>
                <span className="font-bold text-text-main">Chat WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.098169135152!2d-46.65412682497169!3d-23.56136147879769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa281%3A0x5d6f5751282b82d9!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spl-BR!2sbr"
              className="w-full h-[450px]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Espaço Beleza"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-playfair text-[28px] text-text-main mb-3">Fale Conosco</h3>
            <p className="text-text-secondary text-lg">Tire suas dúvidas ou solicite um orçamento</p>
          </div>
          
          <form className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block font-bold text-text-main mb-2">Nome</label>
              <input type="text" id="name" className="w-full p-4 rounded-xl border border-border bg-bg-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Seu nome completo" />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold text-text-main mb-2">E-mail</label>
              <input type="email" id="email" className="w-full p-4 rounded-xl border border-border bg-bg-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="seu@email.com" />
            </div>
            <div>
              <label htmlFor="phone" className="block font-bold text-text-main mb-2">Telefone</label>
              <input type="tel" id="phone" className="w-full p-4 rounded-xl border border-border bg-bg-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="(11) 99999-9999" />
            </div>
            <div>
              <label htmlFor="subject" className="block font-bold text-text-main mb-2">Assunto</label>
              <select id="subject" className="w-full p-4 rounded-xl border border-border bg-bg-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none bg-no-repeat bg-right bg-[length:20px] bg-[url('data:image/svg+xml,%3Csvg')] xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23757575' d='M6 8L1 3h10z'/%3E%3C/svg%3E)]">
                <option value="">Selecione um assunto</option>
                <option value="agendamento">Agendamento</option>
                <select id="subject" className="w-full p-4 rounded-xl border border-border bg-bg-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none bg-no-repeat bg-right bg-[length:20px] bg-[url('data:image/svg+xml,%3Csvg')] xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23757575' d='M6 8L1 3h10z'/%3E%3C/svg%3E)]">
                  <option value="">Selecione um assunto</option>
                  <option value="agendamento">Agendamento</option>
                  <option value="orcamento">Orçamento</option>
                  <option value="duvida">Dúvida</option>
                  <option value="outro">Outro</option>
                </select>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="message" className="block font-bold text-text-main mb-2">Mensagem</label>
              <textarea id="message" rows="5" className="w-full p-4 rounded-xl border border-border bg-bg-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-vertical min-h-[120px]" placeholder="Sua mensagem..."></textarea>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="w-full py-4 px-8 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-1">
                Enviar Mensagem <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

  );
};

export default Location;