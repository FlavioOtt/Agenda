// src/components/Admin/GerenciarProfissionais.jsx
import React, { useState, useEffect } from 'react';
import profissionalService from '../../services/profissionalService';
import styles from './GerenciarProfissionais.module.css';

const GerenciarProfissionais = () => {
    const [profissionais, setProfissionais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProf, setEditingProf] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        especialidade: '',
        biografia: '',
        telefone: '',
        email: '',
        foto: '',
    });

    useEffect(() => {
        loadProfissionais();
    }, []);

    const loadProfissionais = async () => {
        try {
            setLoading(true);
            const data = await profissionalService.getAllAdmin();
            setProfissionais(data);
        } catch (error) {
            console.error('Erro ao carregar profissionais:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (id, ativo) => {
        try {
            const prof = profissionais.find(p => p.id === id);
            await profissionalService.update(id, { ...prof, ativo: !ativo });
            loadProfissionais();
        } catch (error) {
            alert('Erro ao atualizar');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este profissional?')) {
            try {
                await profissionalService.delete(id);
                alert('Profissional excluído');
                loadProfissionais();
            } catch (error) {
                alert('Erro ao excluir');
            }
        }
    };

    const openModal = (prof = null) => {
        if (prof) {
            setEditingProf(prof);
            setFormData({
                nome: prof.nome,
                especialidade: prof.especialidade || '',
                biografia: prof.biografia || '',
                telefone: prof.telefone || '',
                email: prof.email || '',
                foto: prof.foto || '',
            });
        } else {
            setEditingProf(null);
            setFormData({
                nome: '',
                especialidade: '',
                biografia: '',
                telefone: '',
                email: '',
                foto: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProf(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProf) {
                await profissionalService.update(editingProf.id, { ...editingProf, ...formData });
                alert('Profissional atualizado com sucesso');
            } else {
                await profissionalService.create(formData);
                alert('Profissional criado com sucesso');
            }
            closeModal();
            loadProfissionais();
        } catch (error) {
            alert('Erro ao salvar');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Profissionais</h1>
                    <p>Gerencie a equipe do salão</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal()}>
                    <i className="fa-solid fa-plus"></i> Novo Profissional
                </button>
            </div>

            {/* Grid de Profissionais */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#D4AF37' }}></i>
                </div>
            ) : (
                <div className={styles.profGrid}>
                    {profissionais.map((prof) => (
                        <div key={prof.id} className={`${styles.card} ${!prof.ativo ? styles.inactive : ''}`}>
                            <div className={styles.cardAvatar}>
                                <img
                                    src={prof.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.nome)}&background=D4AF37&color=fff&size=100`}
                                    alt={prof.nome}
                                />
                            </div>
                            <div className={styles.cardBody}>
                                <h3>{prof.nome}</h3>
                                <span className={styles.especialidade}>{prof.especialidade}</span>
                                <div className={styles.contactInfo}>
                                    <span><i className="fa-solid fa-phone"></i> {prof.telefone || '-'}</span>
                                    <span><i className="fa-solid fa-envelope"></i> {prof.email || '-'}</span>
                                </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <label className={styles.toggle}>
                                    <input
                                        type="checkbox"
                                        checked={prof.ativo}
                                        onChange={() => handleToggleActive(prof.id, prof.ativo)}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                                <div className={styles.actions}>
                                    <button className={styles.editBtn} onClick={() => openModal(prof)}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button className={styles.deleteBtn} onClick={() => handleDelete(prof.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
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
                            <h2>{editingProf ? 'Editar Profissional' : 'Novo Profissional'}</h2>
                            <button className={styles.closeBtn} onClick={closeModal}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Nome Completo</label>
                                <input
                                    type="text"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    placeholder="Ex: Carla Silva"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Especialidade</label>
                                <select
                                    value={formData.especialidade}
                                    onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Cabeleireira">Cabeleireira</option>
                                    <option value="Barbeiro">Barbeiro</option>
                                    <option value="Manicure">Manicure</option>
                                    <option value="Pedicure">Pedicure</option>
                                    <option value="Maquiador">Maquiador</option>
                                    <option value="Esteticista">Esteticista</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Telefone</label>
                                <input
                                    type="tel"
                                    value={formData.telefone}
                                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                    placeholder="(11) 99999-9999"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>E-mail</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="profissional@email.com"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Biografia</label>
                                <textarea
                                    value={formData.biografia}
                                    onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
                                    placeholder="Breve descrição sobre o profissional..."
                                    rows={3}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.saveBtn}>
                                    {editingProf ? 'Salvar' : 'Criar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GerenciarProfissionais;