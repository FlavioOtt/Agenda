// src/components/Home/Gallery.jsx
import React, { useState } from 'react';
import styles from './Gallery.module.css';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    alt: 'Cabelo mulher',
    category: 'cabelo',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    alt: 'Maquiagem',
    category: 'maquiagem',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    alt: 'Unhas decoradas',
    category: 'unhas',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    alt: 'Spa facial',
    category: 'spa',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    alt: 'Corte de cabelo',
    category: 'cabelo',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    alt: 'Maquiagem noiva',
    category: 'maquiagem',
  },
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'cabelo', label: 'Cabelo' },
    { id: 'unhas', label: 'Unhas' },
    { id: 'maquiagem', label: 'Maquiagem' },
    { id: 'spa', label: 'Spa' },
  ];

  return (
    <section className={styles.section} id="galeria">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nossa Galeria</h2>
          <p className={styles.subtitle}>
            Resultados de alguns dos nossos trabalhos
          </p>
        </div>

        <div className={styles.filter}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${filter === cat.id ? styles.active : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className={styles.item}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} />
              <div className={styles.overlay}>
                <i className="fa-solid fa-expand"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Imagem Ampliada */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
            <i className="fa-solid fa-times"></i>
          </button>
          <img src={selectedImage.src} alt={selectedImage.alt} />
        </div>
      )}
    </section>
  );
};

export default Gallery;