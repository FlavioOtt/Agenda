// src/components/Agendamento/StepDateTime.jsx
import React, { useState, useEffect } from 'react';
import profissionalService from '../../services/profissionalService';
import agendamentoService from '../../services/agendamentoService';
// Tailwind CSS


const StepDateTime = ({ formData, onUpdate, onNext, onBack }) => {
    const [professionals, setProfessionals] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedProf, setSelectedProf] = useState(formData.professional);
    const [selectedDate, setSelectedDate] = useState(formData.date);
    const [selectedTime, setSelectedTime] = useState(formData.time);

    useEffect(() => {
        loadProfessionals();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            loadAvailability();
        }
    }, [selectedDate, selectedProf]);

    const loadProfessionals = async () => {
        try {
            const data = await profissionalService.getAll();
            setProfessionals(data);
        } catch (err) {
            console.error('Erro ao carregar profissionais:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadAvailability = async () => {
        try {
            const profId = selectedProf === 'any' ? '' : selectedProf?.id;
            const data = await agendamentoService.getDisponibilidade(profId, selectedDate);
            setAvailableTimes(data);
        } catch (err) {
            console.error('Erro ao carregar disponibilidade:', err);
        }
    };

    const handleContinue = () => {
        if (selectedProf && selectedDate && selectedTime) {
            onUpdate('professional', selectedProf);
            onUpdate('date', selectedDate);
            onUpdate('time', selectedTime);
            onNext();
        } else {
            alert('Por favor, selecione profissional, data e horário.');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#D4AF37' }}></i>
            </div>
        );
    }

    return (
<div className="animate-fade-in">
            <h2 className="font-playfair text-[28px] text-center mb-3 text-text-main">Escolha o profissional e horário</h2>

            <div className="grid gap-8 mb-10">
                {/* Profissional */}
                <div>
                    <label className="block font-bold text-text-main mb-4 text-lg">Profissional</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                        {professionals.map((prof) => (
                            <div
                                key={prof.id}
                                className={`group p-4 rounded-xl border-2 cursor-pointer flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                                    selectedProf?.id === prof.id 
                                      ? 'border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-primary/30 ring-2 ring-primary/50' 
                                      : 'border-border hover:border-primary'
                                }`}
                                onClick={() => setSelectedProf(prof)}
                            >
                                <img 
                                    src={prof.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.nome)}&background=D4AF37&color=fff&size=40`} 
                                    alt={prof.nome} 
                                    className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform"
                                />
                                <span className="font-semibold text-text-main truncate">{prof.nome}</span>
                            </div>
                        ))}
                        <div
                            className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                                selectedProf === 'any' 
                                  ? 'border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-primary/30 ring-2 ring-primary/50' 
                                  : 'border-border hover:border-primary'
                            }`}
                            onClick={() => setSelectedProf('any')}
                        >
                            <div className="w-12 h-12 bg-bg-light rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-users text-xl text-text-main"></i>
                            </div>
                            <span className="font-semibold text-text-main">Qualquer profissional disponível</span>
                        </div>
                    </div>
                </div>

                {/* Data */}
                <div>
                    <label className="block font-bold text-text-main mb-4 text-lg">Data</label>
                    <div className="relative">
                        <input
                            type="date"
                            className="w-full p-4 pl-12 border-2 border-border rounded-2xl text-lg font-medium focus:ring-4 focus:ring-primary/30 focus:border-primary transition-all bg-white shadow-inner hover:shadow-md"
                            min={today}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl"></i>
                    </div>
                </div>

                {/* Horários */}
                {selectedDate && (
                    <div>
                        <label className="block font-bold text-text-main mb-4 text-lg">Horários Disponíveis</label>
                        {availableTimes.length > 0 ? (
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {availableTimes.map((item) => (
                                    <button
                                        key={item.hora}
                                        className={`p-4 rounded-xl font-semibold border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 ${
                                            selectedTime === item.hora 
                                              ? 'bg-primary text-white border-primary shadow-primary/40 ring-4 ring-primary/30' 
                                              : item.disponivel 
                                                ? 'border-border hover:border-primary hover:bg-primary/5 hover:text-primary' 
                                                : 'border-border-gray bg-bg-light text-text-disabled'
                                        }`}
                                        onClick={() => item.disponivel && setSelectedTime(item.hora)}
                                        disabled={!item.disponivel}
                                    >
                                        {item.hora}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-bg-light rounded-2xl">
                                <i className="fa-solid fa-clock text-4xl text-text-secondary mb-4 block"></i>
                                <p className="text-lg font-medium text-text-secondary">Nenhum horário disponível nesta data</p>
                                <p className="text-sm text-text-disabled mt-1">Tente outra data ou profissional</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-end">
                <button 
                    className="px-8 py-4 border-2 border-border text-text-secondary font-bold rounded-xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-lg hover:shadow-xl" 
                    onClick={onBack}
                >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Voltar
                </button>
                <button 
                    className="px-12 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-xl hover:shadow-primary/40 transition-all flex items-center gap-2" 
                    onClick={handleContinue}
                >
                    Próximo
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>

    );
};

export default StepDateTime;