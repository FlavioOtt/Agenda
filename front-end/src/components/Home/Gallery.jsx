// src/components/Home/Gallery.jsx
import React, { useState } from 'react';
// Tailwind CSS


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
<section id="galeria" className="py-20 bg-bg-light">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-[40px] text-text-main mb-4">Nossa Galeria</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Resultados de alguns dos nossos trabalhos
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-6 py-3 border font-bold rounded-full text-sm transition-all ${
                filter === cat.id 
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/25' 
                  : 'border-border bg-white text-text-secondary hover:border-primary hover:text-primary hover:shadow-md'
              }`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative rounded-3xl overflow-hidden cursor-pointer aspect-square group hover:shadow-2xl transition-all duration-500 bg-white shadow-card"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <i className="fa-solid fa-expand text-white text-3xl"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-5 animate-fade-in" 
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white text-4xl hover:rotate-90 transition-all p-2 -m-2" onClick={() => setSelectedImage(null)}>
            <i className="fa-solid fa-times"></i>
          </button>
          <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-[95vw] max-h-[95vh] rounded-2xl object-contain shadow-2xl" />
        </div>
      )}
    </section>

  );
};

export default Gallery;