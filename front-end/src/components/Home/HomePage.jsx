// src/components/Home/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import servicoService from '../../services/servicoService';
import profissionalService from '../../services/profissionalService';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Hero from './Hero';
import ServicesPreview from './ServicesPreview';
import About from './About';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Location from './Location';
// Tailwind CSS


const HomePage = () => {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingProf, setLoadingProf] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Carregar serviços em destaque (4 primeiros)
      const servicosData = await servicoService.getAll();
      setServices(servicosData.slice(0, 4));
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    } finally {
      setLoadingServices(false);
    }

    try {
      // Carregar profissionais
      const profData = await profissionalService.getAll();
      setProfessionals(profData);
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
    } finally {
      setLoadingProf(false);
    }
  };

  return (
<div className="min-h-screen bg-bg-light">
      <Header />
      <main>
        <Hero />
        
        
        
        <About 
          professionals={professionals}
          loading={loadingProf}
        />
        
        <Gallery />
        <Testimonials />
        <Location />
      </main>
      <Footer />
    </div>

  );
};

export default HomePage;