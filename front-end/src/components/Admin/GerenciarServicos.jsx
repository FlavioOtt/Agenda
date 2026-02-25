// src/components/Admin/GerenciarServicos.jsx
import React, { useState, useEffect } from 'react';
import servicoService from '../../services/servicoService';
import styles from './GerenciarServicos.module.css';

const GerenciarServicos = () => {
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        categoria: 'cabelo',
        preco: '',
        duracao_minutos: '',
        descricao: '',
        imagem: '',
    });

    useEffect(() => {
        loadServicos();
    }, []);

    const loadServicos = async () => {
        try {
            setLoading(true);
            const data = await servicoService.getAllAdmin();
            setServicos(data);
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (id, ativo) => {
        try {
            const servico = servicos.find(s => s.id === id);
            await servicoService.update(id, { ...servico, ativo: !ativo });
            loadServicos();
        } catch (error) {
            alert('Erro ao atualizar');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                await servicoService.delete(id);
                alert('Serviço excluído');
                loadServicos();
            } catch (error) {
                alert('Erro ao excluir');
            }
        }
    };

    const openModal = (servico = null) => {
        if (servico) {
            setEditingService(servico);
            setFormData({
                nome: servico.nome,
                categoria: servico.categoria,
                preco: servico.preco,
                duracao_minutos: servico.duracao_minutos,
                descricao: servico.descricao || '',
                imagem: servico.imagem || '',
            });
        } else {
            setEditingService(null);
            setFormData({
                nome: '',
                categoria: 'cabelo',
                preco: '',
                duracao_minutos: '',
                descricao: '',
                imagem: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                preco: parseFloat(formData.preco),
                duracao_minutos: parseInt(formData.duracao_minutos),
            };

            if (editingService) {
                await servicoService.update(editingService.id, { ...editingService, ...payload });
                alert('Serviço atualizado com sucesso');
            } else {
                await servicoService.create(payload);
                alert('Serviço criado com sucesso');
            }
            closeModal();
            loadServicos();
        } catch (error) {
            alert('Erro ao salvar serviço');
        }
    };

    const getCategoryIcon = (categoria) => {
        const icons = {
            cabelo: 'fa-scissors',
            unha: 'fa-hand-sparkles',
            maquiagem: 'fa-wand-magic-sparkles',
            spa: 'fa-spa',
            outro: 'fa-star',
        };
        return icons[categoria] || 'fa-scissors';
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Serviços</h1>
                    <p>Gerencie os serviços oferecidos pelo salão</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal()}>
                    <i className="fa-solid fa-plus"></i> Novo Serviço
                </button>
            </div>

            {/* Cards de Serviços */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#D4AF37' }}></i>
                </div>
            ) : (
                <div className={styles.servicesGrid}>
                    {servicos.map((servico) => (
                        <div key={servico.id} className={`${styles.card} ${!servico.ativo ? styles.inactive : ''}`}>
                            <div className={styles.cardHeader}>
                                <span className={styles.categoria}>
                                    <i className={`fa-solid ${getCategoryIcon(servico.categoria)}`}></i>
                                    {servico.categoria}
                                </span>
                                <label className={styles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={servico.ativo}
                                        onChange={() => handleToggleActive(servico.id, servico.ativo)}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                            <div className={styles.cardBody}>
                                <h3>{servico.nome}</h3>
                                <p className={styles.descricao}>{servico.descricao}</p>
                                <div className={styles.details}>
                                    <span><i className="fa-regular fa-clock"></i> {servico.duracao_minutos} min</span>
                                    <span className={styles.preco}>R$ {parseFloat(servico.preco).toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <button className={styles.editBtn} onClick={() => openModal(servico)}>
                                    <i className="fa-solid fa-pen"></i> Editar
                                </button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(servico.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingService ? 'Editar Serviço' : 'Novo Serviço'}</h2>
                            <button className={styles.closeBtn} onClick={closeModal}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Nome do Serviço</label>
                                <input
                                    type="text"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    placeholder="Ex: Corte Feminino"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Categoria</label>
                                <select
                                    value={formData.categoria}
                                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                >
                                    <option value="cabelo">Cabelo</option>
                                    <option value="unha">Unhas</option>
                                    <option value="maquiagem">Maquiagem</option>
                                    <option value="spa">Spa</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Preço (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.preco}
                                        onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                                        placeholder="80.00"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Duração (min)</label>
                                    <input
                                        type="number"
                                        value={formData.duracao_minutos}
                                        onChange={(e) => setFormData({ ...formData, duracao_minutos: e.target.value })}
                                        placeholder="45"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Descrição</label>
                                <textarea
                                    value={formData.descricao}
                                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                    placeholder="Descrição do serviço..."
                                    rows={3}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.saveBtn}>
                                    {editingService ? 'Salvar' : 'Criar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GerenciarServicos;