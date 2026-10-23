// src/components/Home/About.jsx
import React from 'react';
// Tailwind CSS


const About = ({ professionals, loading }) => {
    return (
<section id="sobre" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-5">
                <div className="grid lg:grid-cols-2 gap-15 items-center">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1521590832169-7dad6c8cc8c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Espaço Beleza - Interior do salão"
                            className="w-full rounded-3xl shadow-2xl"
                        />
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl shadow-primary/40 text-center p-3">
                            <span className="font-playfair text-3xl font-black leading-tight">10+</span>
                            <span className="text-xs uppercase tracking-wider font-bold mt-1 leading-tight">Anos de<br/>Experiência</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-primary text-sm uppercase tracking-widest font-bold mb-3">Sobre Nós</h4>
                        <h2 className="font-playfair text-[40px] text-text-main mb-5 leading-tight">Um Espaço Dedicado à Sua Beleza</h2>
                        <p className="text-text-secondary text-lg leading-relaxed mb-5">
                            O Espaço Beleza nasceu com a missão de transformar a experiência de
                            cuidar de si mesma. Localizado no coração da cidade, oferecemos um
                            ambiente acolhedor e sofisticado, onde cada detalhe foi pensado para
                            proporcionar momentos de relaxamento e renovação.
                        </p>
                        <p className="text-text-secondary text-lg leading-relaxed mb-8">
                            Nossa equipe é formada por profissionais altamente qualificados e
                            apaixonados pelo que fazem. Utilizamos apenas produtos de marcas
                            reconhecidas internacionalmente, garantindo resultados excepcionais
                            e a segurança que você merece.
                        </p>

                        {/* Team Preview */}
                        {!loading && professionals && professionals.length > 0 && (
                            <div className="mb-8">
                                <h4 className="text-2xl font-bold text-text-main mb-6">Nossa Equipe</h4>
                                <div className="flex gap-4 flex-wrap -space-x-4 -space-y-4">
                                    {professionals.slice(0, 4).map((prof, index) => (
                                        <div key={prof.id} className={`relative z-[${10-index}] bg-white rounded-full p-2 shadow-lg`}>
                                            <img
                                                src={prof.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.nome)}&background=D4AF37&color=fff`}
                                                alt={prof.nome}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <span className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                                                {prof.nome.split(' ')[0]}
                                            </span>
                                        </div>
                                    ))}
                                    {professionals.length > 4 && (
                                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30 relative z-10">
                                            <span className="text-primary font-bold text-lg">+{professionals.length - 4}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                    <i className="fa-solid fa-check text-primary text-lg"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-text-main mb-2">Profissionais Qualificados</h4>
                                    <p className="text-text-secondary">Equipe certificada e em constante atualização</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                    <i className="fa-solid fa-check text-primary text-lg"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-text-main mb-2">Produtos Premium</h4>
                                    <p className="text-text-secondary">Marcas reconhecidas internacionalmente</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                    <i className="fa-solid fa-check text-primary text-lg"></i>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-text-main mb-2">Ambiente Acolhedor</h4>
                                    <p className="text-text-secondary">Conforto e relaxamento em cada detalhe</p>
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